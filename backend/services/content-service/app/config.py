import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "Content & Editorial Service"
    PORT: int = int(os.getenv("SERVICE_PORT", "8004"))
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "mysql+aiomysql://u738606952_theconclusive:Theconclusive%40123@127.0.0.1:3306/u738606952_theconclusive?charset=utf8mb4"
    )
    TAXONOMY_SERVICE_URL: str = os.getenv("TAXONOMY_SERVICE_URL", "http://localhost:8003")
    USER_SERVICE_URL: str = os.getenv("USER_SERVICE_URL", "http://localhost:8002")

settings = Settings()
