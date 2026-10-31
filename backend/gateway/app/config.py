import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "The Conclusive Indian - API Gateway"
    PORT: int = int(os.getenv("GATEWAY_PORT", "8000"))

    # Downstream service URLs
    IDENTITY_SERVICE_URL: str = os.getenv("IDENTITY_SERVICE_URL", "http://localhost:8001")
    USER_SERVICE_URL: str = os.getenv("USER_SERVICE_URL", "http://localhost:8002")
    TAXONOMY_SERVICE_URL: str = os.getenv("TAXONOMY_SERVICE_URL", "http://localhost:8003")
    CONTENT_SERVICE_URL: str = os.getenv("CONTENT_SERVICE_URL", "http://localhost:8004")
    PAGE_BUILDER_SERVICE_URL: str = os.getenv("PAGE_BUILDER_SERVICE_URL", "http://localhost:8005")
    MEDIA_SERVICE_URL: str = os.getenv("MEDIA_SERVICE_URL", "http://localhost:8006")
    CONTACT_SERVICE_URL: str = os.getenv("CONTACT_SERVICE_URL", "http://localhost:8007")

    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://theconclusiveindian.in"
    ]

settings = Settings()
