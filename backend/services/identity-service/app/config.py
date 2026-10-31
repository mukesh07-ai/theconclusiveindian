import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "Identity & Authentication Service"
    PORT: int = int(os.getenv("SERVICE_PORT", "8001"))
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mysql+aiomysql://u738606952_theconclusive:Theconclusive%40123@127.0.0.1:3306/u738606952_theconclusive?charset=utf8mb4"
    )
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "theconclusiveindian-dev-secret-key-change-in-production-2026")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))

settings = Settings()
