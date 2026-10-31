import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SERVICE_NAME: str = "Contact & Moderation Service"
    PORT: int = int(os.getenv("SERVICE_PORT", "8007"))
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "mysql+aiomysql://root:MYSQLTEST@127.0.0.1:3306/theconclusiveindian_db?charset=utf8mb4"
    )

settings = Settings()
