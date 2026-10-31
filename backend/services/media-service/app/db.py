from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from .config import settings

try:
    from shared.db import Base
except ImportError:
    class Base(DeclarativeBase):
        pass

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
