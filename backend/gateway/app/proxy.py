import uuid
import httpx
from fastapi import Request, Response
from fastapi.responses import JSONResponse

async def forward_request(target_base_url: str, request: Request, path: str) -> Response:
    """
    Reverse proxy helper that forwards an incoming FastAPI request to a downstream microservice.
    Injects or propagates X-Correlation-ID for distributed tracing.
    """
    correlation_id = request.headers.get("x-correlation-id", str(uuid.uuid4()))

    # Build target URL
    url = f"{target_base_url.rstrip('/')}/{path.lstrip('/')}"
    if request.url.query:
        url = f"{url}?{request.url.query}"

    # Filter incoming headers
    headers = dict(request.headers)
    headers.pop("host", None)
    headers.pop("content-length", None)
    headers["x-correlation-id"] = correlation_id

    # Read body
    body = await request.body()

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.request(
                method=request.method,
                url=url,
                headers=headers,
                content=body
            )

            # Filter response headers
            res_headers = dict(resp.headers)
            res_headers.pop("content-encoding", None)
            res_headers.pop("content-length", None)
            res_headers["x-correlation-id"] = correlation_id

            return Response(
                content=resp.content,
                status_code=resp.status_code,
                headers=res_headers,
                media_type=resp.headers.get("content-type")
            )
    except httpx.ConnectError:
        return JSONResponse(
            status_code=502,
            content={
                "success": False,
                "error": "Bad Gateway",
                "message": f"Unable to connect to downstream service at {target_base_url}",
                "correlationId": correlation_id
            },
            headers={"x-correlation-id": correlation_id}
        )
    except httpx.TimeoutException:
        return JSONResponse(
            status_code=504,
            content={
                "success": False,
                "error": "Gateway Timeout",
                "message": f"Downstream service timed out at {target_base_url}",
                "correlationId": correlation_id
            },
            headers={"x-correlation-id": correlation_id}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Internal Gateway Error",
                "message": str(e),
                "correlationId": correlation_id
            },
            headers={"x-correlation-id": correlation_id}
        )
