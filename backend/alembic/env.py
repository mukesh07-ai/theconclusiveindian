import asyncio
import os
import sys
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
from dotenv import load_dotenv

from alembic import context

# 1. Setup paths and load environment variables
backend_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_root not in sys.path:
    sys.path.insert(0, backend_root)

load_dotenv(os.path.join(backend_root, ".env"))

# 2. Alembic Config
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# 3. Dynamic Database URL from environment
db_url = os.getenv(
    "DATABASE_URL",
    "mysql+aiomysql://u738606952_theconclusive:Theconclusive%40123@127.0.0.1:3306/u738606952_theconclusive?charset=utf8mb4"
)
config.set_main_option("sqlalchemy.url", db_url)

# 4. Import unified DeclarativeBase and register all microservice models
from shared.db import Base
import services.identity_service.app.models
import services.user_service.app.models
import services.taxonomy_service.app.models
import services.content_service.app.models
import services.page_builder_service.app.models
import services.media_service.app.models
import services.contact_moderation_service.app.models

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
