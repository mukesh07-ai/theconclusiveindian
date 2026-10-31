import uuid
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from .db import engine, Base, async_session
from .models import User, Role
from .routes import router
from .config import settings
from shared.contracts.security import hash_password

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed initial roles and users
    async with async_session() as db:
        roles_to_seed = [
            ("super_admin", "Super Administrator with full platform governance"),
            ("editor_in_chief", "Chief Editor with top-level editorial control"),
            ("editor", "Editorial staff member managing article publishing and taxonomy"),
            ("author", "Contributing writer and columnist"),
            ("reporter", "Field reporter submitting drafts"),
            ("moderator", "Grievance and feedback moderator"),
            ("reader", "Verified platform reader"),
        ]
        created_roles = {}
        for r_name, r_desc in roles_to_seed:
            res = await db.execute(select(Role).where(Role.name == r_name))
            role_obj = res.scalar_one_or_none()
            if not role_obj:
                role_obj = Role(name=r_name, description=r_desc)
                db.add(role_obj)
            created_roles[r_name] = role_obj
        await db.commit()

        # Seed super admin
        admin_res = await db.execute(select(User).where(User.email == "admin@theconclusiveindian.in"))
        if not admin_res.scalar_one_or_none():
            admin_user = User(
                id=str(uuid.uuid4()),
                email="admin@theconclusiveindian.in",
                hashed_password=hash_password("Admin@TCI2026!"),
                full_name="मुख्य प्रशासक (Super Admin)",
                roles=[created_roles["super_admin"]]
            )
            db.add(admin_user)

        # Seed editor
        editor_res = await db.execute(select(User).where(User.email == "editor@theconclusiveindian.in"))
        if not editor_res.scalar_one_or_none():
            editor_user = User(
                id=str(uuid.uuid4()),
                email="editor@theconclusiveindian.in",
                hashed_password=hash_password("Editor@TCI2026!"),
                full_name="संपादकीय मंडल (Editor)",
                roles=[created_roles["editor"]]
            )
            db.add(editor_user)

        # Seed author
        author_res = await db.execute(select(User).where(User.email == "author@theconclusiveindian.in"))
        if not author_res.scalar_one_or_none():
            author_user = User(
                id=str(uuid.uuid4()),
                email="author@theconclusiveindian.in",
                hashed_password=hash_password("Author@TCI2026!"),
                full_name="वरिष्ठ संवाददाता (Senior Author)",
                roles=[created_roles["author"]]
            )
            db.add(author_user)

        await db.commit()

    yield
    await engine.dispose()

app = FastAPI(
    title=settings.SERVICE_NAME,
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": settings.SERVICE_NAME,
        "database": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
