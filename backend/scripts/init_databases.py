"""
Database initialization and verification script for The Conclusive Indian.
Creates tables and seeds default data across all 7 microservice databases in MySQL.
"""
import asyncio
import os
import sys
from dotenv import load_dotenv

# Ensure backend root is on Python path and load .env
backend_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, backend_root)
load_dotenv(os.path.join(backend_root, ".env"))

from services.identity_service.app.main import app as id_app, lifespan as id_lifespan
from services.user_service.app.main import app as user_app, lifespan as user_lifespan
from services.taxonomy_service.app.main import app as tax_app, lifespan as tax_lifespan
from services.content_service.app.main import app as content_app, lifespan as content_lifespan
from services.page_builder_service.app.main import app as page_app, lifespan as page_lifespan
from services.media_service.app.main import app as media_app, lifespan as media_lifespan
from services.contact_moderation_service.app.main import app as contact_app, lifespan as contact_lifespan

async def init_all():
    print("🚀 Initializing and seeding microservice database tables in MySQL...")

    services = [
        ("Identity Service", id_app, id_lifespan),
        ("User Service", user_app, user_lifespan),
        ("Taxonomy Service", tax_app, tax_lifespan),
        ("Content Service", content_app, content_lifespan),
        ("Page Builder Service", page_app, page_lifespan),
        ("Media Service", media_app, media_lifespan),
        ("Contact & Moderation Service", contact_app, contact_lifespan),
    ]

    for name, app_instance, lifespan_func in services:
        print(f"  -> Initializing & seeding {name}...")
        async with lifespan_func(app_instance):
            print(f"  ✓ {name} schema created and initial data seeded.")

    print("\n✅ All 7 microservice databases created, migrated, and seeded successfully in MySQL!")

if __name__ == "__main__":
    asyncio.run(init_all())
