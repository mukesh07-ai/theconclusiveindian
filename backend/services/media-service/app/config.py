import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "Media Service"
    PORT: int = int(os.getenv("SERVICE_PORT", "8006"))
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "mysql+aiomysql://u738606952_theconclusive:Theconclusive%40123@127.0.0.1:3306/u738606952_theconclusive?charset=utf8mb4"
    )
    MEDIA_UPLOAD_DIR: str = os.getenv("MEDIA_UPLOAD_DIR", "./backend/uploads")
    MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "10"))
    ALLOWED_IMAGE_TYPES: list = ["image/jpeg", "image/png", "image/webp", "image/avif"]

settings = Settings()
