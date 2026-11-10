import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .proxy import forward_request

app = FastAPI(
    title=settings.SERVICE_NAME,
    description="Unified API Gateway and Edge Router for The Conclusive Indian microservices",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Identity & Auth Routes
@app.api_route("/api/v1/auth/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def route_auth(request: Request, path: str):
    return await forward_request(settings.IDENTITY_SERVICE_URL, request, f"api/v1/auth/{path}")

@app.api_route("/api/v1/admin/users", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/users/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def route_admin_users(request: Request, path: str = ""):
    subpath = f"api/v1/admin/users/{path}" if path else "api/v1/admin/users"
    return await forward_request(settings.IDENTITY_SERVICE_URL, request, subpath)

# 2. User & Author Profile Routes
@app.api_route("/api/v1/authors", methods=["GET"])
@app.api_route("/api/v1/authors/{path:path}", methods=["GET"])
async def route_authors(request: Request, path: str = ""):
    subpath = f"api/v1/authors/{path}" if path else "api/v1/authors"
    return await forward_request(settings.USER_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/admin/authors", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/authors/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def route_admin_authors(request: Request, path: str = ""):
    subpath = f"api/v1/admin/authors/{path}" if path else "api/v1/admin/authors"
    return await forward_request(settings.USER_SERVICE_URL, request, subpath)

# 3. Taxonomy Routes
@app.api_route("/api/v1/categories", methods=["GET"])
@app.api_route("/api/v1/categories/{path:path}", methods=["GET"])
async def route_categories(request: Request, path: str = ""):
    subpath = f"api/v1/categories/{path}" if path else "api/v1/categories"
    return await forward_request(settings.TAXONOMY_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/admin/categories", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/categories/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def route_admin_categories(request: Request, path: str = ""):
    subpath = f"api/v1/admin/categories/{path}" if path else "api/v1/admin/categories"
    return await forward_request(settings.TAXONOMY_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/tags", methods=["GET"])
@app.api_route("/api/v1/tags/{path:path}", methods=["GET"])
async def route_tags(request: Request, path: str = ""):
    subpath = f"api/v1/tags/{path}" if path else "api/v1/tags"
    return await forward_request(settings.TAXONOMY_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/admin/tags", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/tags/{path:path}", methods=["GET", "POST", "DELETE"])
async def route_admin_tags(request: Request, path: str = ""):
    subpath = f"api/v1/admin/tags/{path}" if path else "api/v1/admin/tags"
    return await forward_request(settings.TAXONOMY_SERVICE_URL, request, subpath)

# 4. Content & Editorial Routes
@app.api_route("/api/v1/articles", methods=["GET"])
@app.api_route("/api/v1/articles/{path:path}", methods=["GET"])
async def route_articles(request: Request, path: str = ""):
    subpath = f"api/v1/articles/{path}" if path else "api/v1/articles"
    return await forward_request(settings.CONTENT_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/admin/articles", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/articles/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def route_admin_articles(request: Request, path: str = ""):
    subpath = f"api/v1/admin/articles/{path}" if path else "api/v1/admin/articles"
    return await forward_request(settings.CONTENT_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/breaking-news", methods=["GET"])
@app.api_route("/api/v1/breaking-news/{path:path}", methods=["GET"])
async def route_breaking_news(request: Request, path: str = ""):
    subpath = f"api/v1/breaking-news/{path}" if path else "api/v1/breaking-news"
    return await forward_request(settings.CONTENT_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/admin/breaking-news", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/breaking-news/{path:path}", methods=["GET", "POST", "DELETE"])
async def route_admin_breaking_news(request: Request, path: str = ""):
    subpath = f"api/v1/admin/breaking-news/{path}" if path else "api/v1/admin/breaking-news"
    return await forward_request(settings.CONTENT_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/multimedia/{path:path}", methods=["GET"])
async def route_multimedia(request: Request, path: str):
    return await forward_request(settings.CONTENT_SERVICE_URL, request, f"api/v1/multimedia/{path}")

# 5. Page Builder & Configuration Routes
@app.api_route("/api/v1/homepage/sections", methods=["GET"])
@app.api_route("/api/v1/admin/homepage/{path:path}", methods=["GET", "PUT", "POST", "DELETE"])
async def route_homepage(request: Request, path: str = ""):
    subpath = f"api/v1/admin/homepage/{path}" if "admin" in request.url.path else "api/v1/homepage/sections"
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/navigation", methods=["GET"])
@app.api_route("/api/v1/admin/navigation", methods=["GET", "PUT", "POST"])
async def route_navigation(request: Request):
    subpath = "api/v1/admin/navigation" if "admin" in request.url.path else "api/v1/navigation"
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/site-config", methods=["GET"])
@app.api_route("/api/v1/admin/site-config", methods=["GET", "PUT"])
async def route_site_config(request: Request):
    subpath = "api/v1/admin/site-config" if "admin" in request.url.path else "api/v1/site-config"
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/pages", methods=["GET"])
@app.api_route("/api/v1/pages/{path:path}", methods=["GET"])
@app.api_route("/api/v1/admin/pages", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/pages/{path:path}", methods=["GET", "PUT", "DELETE"])
async def route_pages(request: Request, path: str = ""):
    prefix = "api/v1/admin/pages" if "admin" in request.url.path else "api/v1/pages"
    subpath = f"{prefix}/{path}" if path else prefix
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

# 6. Advertisements & Redirects
@app.api_route("/api/v1/ads", methods=["GET"])
@app.api_route("/api/v1/ads/{path:path}", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/ads", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/ads/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def route_ads(request: Request, path: str = ""):
    prefix = "api/v1/admin/ads" if "admin" in request.url.path else "api/v1/ads"
    subpath = f"{prefix}/{path}" if path else prefix
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

@app.api_route("/api/v1/redirects/{path:path}", methods=["GET"])
@app.api_route("/api/v1/admin/redirects", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/redirects/{path:path}", methods=["GET", "DELETE"])
async def route_redirects(request: Request, path: str = ""):
    prefix = "api/v1/admin/redirects" if "admin" in request.url.path else "api/v1/redirects"
    subpath = f"{prefix}/{path}" if path else prefix
    return await forward_request(settings.PAGE_BUILDER_SERVICE_URL, request, subpath)

# 7. Media Routes
@app.api_route("/api/v1/media/upload", methods=["POST"])
@app.api_route("/api/v1/media", methods=["GET"])
@app.api_route("/api/v1/media/{path:path}", methods=["GET"])
@app.api_route("/api/v1/admin/media/{path:path}", methods=["GET", "DELETE"])
async def route_media(request: Request, path: str = ""):
    if "upload" in request.url.path:
        subpath = "api/v1/media/upload"
    elif "admin" in request.url.path:
        subpath = f"api/v1/admin/media/{path}" if path else "api/v1/admin/media"
    else:
        subpath = f"api/v1/media/{path}" if path else "api/v1/media"
    return await forward_request(settings.MEDIA_SERVICE_URL, request, subpath)

# 8. Contact & Audit Routes
@app.api_route("/api/v1/contact/feedback", methods=["POST"])
@app.api_route("/api/v1/admin/contact/feedback", methods=["GET"])
@app.api_route("/api/v1/admin/contact/feedback/{path:path}", methods=["GET", "PATCH", "DELETE"])
@app.api_route("/api/v1/admin/audit-logs", methods=["GET", "POST"])
@app.api_route("/api/v1/admin/audit-logs/{path:path}", methods=["GET", "POST"])
async def route_contact_and_audit(request: Request, path: str = ""):
    if "audit-logs" in request.url.path:
        subpath = f"api/v1/admin/audit-logs/{path}" if path else "api/v1/admin/audit-logs"
    elif "admin" in request.url.path:
        subpath = f"api/v1/admin/contact/feedback/{path}" if path else "api/v1/admin/contact/feedback"
    else:
        subpath = "api/v1/contact/feedback"
    return await forward_request(settings.CONTACT_SERVICE_URL, request, subpath)

# Health Aggregator
@app.get("/health")
@app.get("/api/v1/health")
async def gateway_health():
    services = {
        "identity_service": settings.IDENTITY_SERVICE_URL,
        "user_service": settings.USER_SERVICE_URL,
        "taxonomy_service": settings.TAXONOMY_SERVICE_URL,
        "content_service": settings.CONTENT_SERVICE_URL,
        "page_builder_service": settings.PAGE_BUILDER_SERVICE_URL,
        "media_service": settings.MEDIA_SERVICE_URL,
        "contact_service": settings.CONTACT_SERVICE_URL,
    }

    health_status = {}
    overall_status = "healthy"

    async with httpx.AsyncClient(timeout=2.0) as client:
        for name, url in services.items():
            try:
                res = await client.get(f"{url}/health")
                if res.status_code == 200:
                    health_status[name] = "UP"
                else:
                    health_status[name] = f"DOWN ({res.status_code})"
                    overall_status = "degraded"
            except Exception:
                health_status[name] = "DOWN (Unreachable)"
                overall_status = "degraded"

    return {
        "status": overall_status,
        "gateway": "UP",
        "downstream_services": health_status
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
