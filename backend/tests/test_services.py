import os
import pytest
from httpx import AsyncClient, ASGITransport
from dotenv import load_dotenv

# Ensure backend root is on sys.path and load environment variables
backend_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
load_dotenv(os.path.join(backend_root, ".env"))

from services.identity_service.app.main import app as identity_app, lifespan as identity_lifespan
from services.user_service.app.main import app as user_app, lifespan as user_lifespan
from services.taxonomy_service.app.main import app as taxonomy_app, lifespan as taxonomy_lifespan
from services.content_service.app.main import app as content_app, lifespan as content_lifespan
from services.page_builder_service.app.main import app as page_builder_app, lifespan as page_lifespan
from services.contact_moderation_service.app.main import app as contact_app, lifespan as contact_lifespan
from gateway.app.main import app as gateway_app

@pytest.mark.asyncio
async def test_identity_service():
    async with identity_lifespan(identity_app):
        transport = ASGITransport(app=identity_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health check
            res = await client.get("/health")
            assert res.status_code == 200
            assert res.json()["status"] == "healthy"

            # 2. Login as admin
            login_res = await client.post(
                "/api/v1/auth/login",
                json={"email": "admin@theconclusiveindian.in", "password": "Admin@TCI2026!"}
            )
            assert login_res.status_code == 200
            login_data = login_res.json()
            assert "access_token" in login_data
            assert "super_admin" in login_data["user"]["roles"]
            token = login_data["access_token"]

            # 3. /me with token
            me_res = await client.get(
                "/api/v1/auth/me",
                headers={"Authorization": f"Bearer {token}"}
            )
            assert me_res.status_code == 200
            assert me_res.json()["email"] == "admin@theconclusiveindian.in"

@pytest.mark.asyncio
async def test_user_service():
    async with user_lifespan(user_app):
        transport = ASGITransport(app=user_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health
            res = await client.get("/health")
            assert res.status_code == 200

            # 2. List authors
            authors_res = await client.get("/api/v1/authors")
            assert authors_res.status_code == 200
            authors = authors_res.json()
            assert len(authors) >= 4
            slugs = [a["slug"] for a in authors]
            assert "raghavendra-shukla" in slugs

            # 3. Get single author
            author_res = await client.get("/api/v1/authors/raghavendra-shukla")
            assert author_res.status_code == 200
            assert author_res.json()["name"] == "राघवेंद्र शुक्ल"

@pytest.mark.asyncio
async def test_taxonomy_service():
    async with taxonomy_lifespan(taxonomy_app):
        transport = ASGITransport(app=taxonomy_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health
            res = await client.get("/health")
            assert res.status_code == 200

            # 2. List 12 categories
            cat_res = await client.get("/api/v1/categories")
            assert cat_res.status_code == 200
            cats = cat_res.json()
            assert len(cats) >= 12
            cat_slugs = [c["slug"] for c in cats]
            assert "national" in cat_slugs
            assert "politics" in cat_slugs

            # 3. Get category by slug
            c_res = await client.get("/api/v1/categories/national")
            assert c_res.status_code == 200
            assert c_res.json()["name"] == "देश"

            # 4. List tags
            tag_res = await client.get("/api/v1/tags")
            assert tag_res.status_code == 200
            tags = tag_res.json()
            assert len(tags) >= 7

@pytest.mark.asyncio
async def test_content_service():
    async with content_lifespan(content_app):
        transport = ASGITransport(app=content_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health
            res = await client.get("/health")
            assert res.status_code == 200

            # 2. List articles
            art_res = await client.get("/api/v1/articles?limit=10")
            assert art_res.status_code == 200
            data = art_res.json()
            assert data["total"] >= 4
            assert len(data["data"]) >= 4

            # 3. Featured articles
            feat_res = await client.get("/api/v1/articles/featured")
            assert feat_res.status_code == 200
            feat = feat_res.json()
            assert len(feat["lead"]["title"]) > 0

            # 4. Breaking news
            bn_res = await client.get("/api/v1/breaking-news")
            assert bn_res.status_code == 200
            bn_items = bn_res.json()
            assert len(bn_items) >= 3

            # 5. Bilingual search
            search_res = await client.get("/api/v1/articles/search?q=चंबल")
            assert search_res.status_code == 200
            search_data = search_res.json()
            assert search_data["total"] >= 1

@pytest.mark.asyncio
async def test_page_builder_service():
    async with page_lifespan(page_builder_app):
        transport = ASGITransport(app=page_builder_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health
            res = await client.get("/health")
            assert res.status_code == 200

            # 2. Homepage sections
            sec_res = await client.get("/api/v1/homepage/sections")
            assert sec_res.status_code == 200
            sections = sec_res.json()
            assert len(sections) >= 7

            # 3. Global site config
            cfg_res = await client.get("/api/v1/site-config")
            assert cfg_res.status_code == 200
            cfg = cfg_res.json()
            assert cfg["name"] == "The Conclusive Indian"
            assert cfg["hindiName"] == "द कन्क्लूसिव इंडियन"

            # 4. Navigation
            nav_res = await client.get("/api/v1/navigation")
            assert nav_res.status_code == 200
            nav = nav_res.json()
            assert "header" in nav
            assert len(nav["header"]) >= 12

            # 5. Static pages
            page_res = await client.get("/api/v1/pages/editorial-policy")
            assert page_res.status_code == 200
            assert page_res.json()["hindiTitle"] == "संपादकीय नीति"

@pytest.mark.asyncio
async def test_contact_moderation_service():
    async with contact_lifespan(contact_app):
        transport = ASGITransport(app=contact_app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            # 1. Health
            res = await client.get("/health")
            assert res.status_code == 200

            # 2. Submit grievance feedback
            sub_res = await client.post(
                "/api/v1/contact/feedback",
                json={
                    "fullName": "राजेश कुमार",
                    "email": "rajesh@example.com",
                    "phone": "+91 98765 43210",
                    "category": "grievance",
                    "subject": "तथ्यात्मक सुधार अनुरोध",
                    "message": "आर्टिकल में उल्लिखित वर्ष की पुनः जांच करें।"
                }
            )
            assert sub_res.status_code == 201
            data = sub_res.json()
            assert data["success"] is True
            assert data["ticketId"].startswith("TCI-")
            ticket_id = data["ticketId"]

            # 3. Admin view feedback
            admin_res = await client.get(f"/api/v1/admin/contact/feedback/{ticket_id}")
            assert admin_res.status_code == 200
            assert admin_res.json()["fullName"] == "राजेश कुमार"

@pytest.mark.asyncio
async def test_gateway_health():
    transport = ASGITransport(app=gateway_app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/health")
        assert res.status_code == 200
        data = res.json()
        assert data["gateway"] == "UP"
        assert "downstream_services" in data
