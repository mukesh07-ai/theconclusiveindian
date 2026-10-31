# The Conclusive Indian — Production Microservices Architecture

Enterprise microservices backend for **The Conclusive Indian (द कन्क्लूसिव इंडियन)** Hindi news platform, built with **Python 3.11+, FastAPI, SQLAlchemy 2.0 (Asyncio), MySQL 8.x, and Docker Compose**.

---

## 🏛️ System Architecture & Service Manifest

The backend is decomposed into genuine, decoupled microservices. No microservice accesses another service's database directly. Communication flows through the **API Gateway** using high-speed asynchronous REST contracts and correlation IDs.

```
                  ┌────────────────────────────────────────────────────────┐
                  │              Next.js 16 Frontend App &                 │
                  │              Editorial Admin Dashboard                 │
                  │             (http://localhost:3000)                    │
                  └───────────────────────────┬────────────────────────────┘
                                              │ HTTP / JSON
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                 API Gateway (Port 8000)                │
                  │           Reverse Proxy, CORS, Health Check            │
                  └──────┬────────────┬─────────────┬────────────┬─────────┘
                         │            │             │            │
         ┌───────────────┼────────────┼─────────────┼────────────┼──────────────┐
         ▼               ▼            ▼             ▼            ▼              ▼
   ┌───────────┐   ┌───────────┐┌───────────┐ ┌───────────┐┌───────────┐  ┌───────────┐
   │ Identity  │   │   User    ││ Taxonomy  │ │  Content  ││PageBuilder│  │  Contact  │
   │  Service  │   │  Service  ││  Service  │ │  Service  ││  Service  │  │&Moderation│
   │ (Pt 8001) │   │ (Pt 8002) ││ (Pt 8003) │ │ (Pt 8004) ││ (Pt 8005) │  │ (Pt 8007) │
   └─────┬─────┘   └─────┬─────┘└─────┬─────┘ └─────┬─────┘└─────┬─────┘  └─────┬─────┘
         │               │            │             │            │              │
         └───────────────┴────────────┼─────────────┴────────────┴──────────────┘
                                      │ Connection Pool (Managed by Alembic)
                                      ▼
                ┌──────────────────────────────────────────────┐
                │    Centralized MySQL 8.0 Application DB      │
                │          `u738606952_theconclusive`            │
                │   utf8mb4_unicode_ci | Unified Database      │
                └──────────────────────────────────────────────┘
```

### 📋 Service Port Directory

| Service | Port | Database Entity Ownership | Primary Responsibility |
|---|---|---|---|
| **API Gateway** | `8000` | N/A (Stateless) | Reverse proxy, prefix routing (`/api/v1/`), correlation IDs, CORS, health aggregator |
| **Identity Service** | `8001` | `users`, `roles`, `user_roles`, `revoked_tokens` | User credentials, bcrypt hashing, JWT tokens, RBAC roles (`super_admin`, `editor`, `author`) |
| **User Service** | `8002` | `authors` | Public author profiles, bios, beats, and social handles |
| **Taxonomy Service** | `8003` | `categories`, `tags` | 12 news categories, tags, slugs, ordering, active status |
| **Content Service** | `8004` | `articles`, `article_tags`, `breaking_news`, `video_stories`, `photo_stories`, `opinion_articles` | News CRUD, editorial workflows, normalized `article_tags` junction, breaking ticker |
| **Page Builder** | `8005` | `homepage_sections`, `site_settings`, `static_pages`, `navigation_items` | Dynamic homepage sections ordering & toggles, global branding settings, navigation items, static policy pages |
| **Media Service** | `8006` | `media_assets` | Secure file uploads, MIME & magic bytes validation, storage abstraction, metadata |
| **Contact & Moderation** | `8007` | `contact_submissions`, `audit_logs` | Reader feedback, editorial correction requests, IT Rules 2021 Grievance Redressal ticketing, immutable audit logs |

---

## 🗄️ MySQL Database Architecture & Migrations

All microservices connect to **one centralized MySQL application database**: `u738606952_theconclusive`. Devanagari Hindi text is fully supported using `utf8mb4` with `utf8mb4_unicode_ci` collation.

Database migrations are strictly version-controlled via **Alembic**:
```bash
# Apply pending database migrations
alembic upgrade head

# Check current migration revision
alembic current

# Create new versioned schema revision
alembic revision --autogenerate -m "description_of_changes"
```

Initialization scripts are pre-configured in `backend/infrastructure/mysql/init.sql` for automated execution on Docker startup.

---

## 🚀 Running the Platform

### Option 1: Native Virtual Environment (Fastest for Local Dev)

1. Activate virtual environment and install dependencies:
   ```bash
   cd backend
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Initialize database schemas:
   ```bash
   python3 scripts/init_databases.py
   ```

3. Start all 8 microservices:
   - **Background daemon mode (Recommended):**
     ```bash
     ./scripts/start_background_services.sh
     ```
     *Logs are streamed to `backend/logs/*.log`. To stop:*
     ```bash
     ./scripts/stop_services.sh
     ```
   - **Foreground terminal mode (Ctrl+C to stop):**
     ```bash
     ./scripts/run_local_services.sh
     ```
     *(Automatically kills any stale processes lingering on ports 8000–8007 before starting)*

### Option 2: Docker Compose (Full Containerized Stack)

```bash
cd backend
docker-compose up --build
```

This starts:
- MySQL 8.0 on port `3307:3306`
- All 7 FastAPI microservices (internal docker network)
- Gateway on port `8000`

---

## 🧪 Automated Testing

Run the comprehensive pytest suite covering all service endpoints and the gateway:

```bash
cd backend
./venv/bin/pytest tests/test_services.py -v
```

Output:
```text
tests/test_services.py::test_identity_service PASSED                     [ 14%]
tests/test_services.py::test_user_service PASSED                         [ 28%]
tests/test_services.py::test_taxonomy_service PASSED                     [ 42%]
tests/test_services.py::test_content_service PASSED                      [ 57%]
tests/test_services.py::test_page_builder_service PASSED                 [ 71%]
tests/test_services.py::test_contact_moderation_service PASSED           [ 85%]
tests/test_services.py::test_gateway_health PASSED                       [100%]
============================== 7 passed in 0.64s ===============================
```

---

## 🔐 Seeded Admin Accounts for Development

| Email | Password | Assigned Role | Capabilities |
|---|---|---|---|
| `admin@theconclusiveindian.in` | `Admin@TCI2026!` | `super_admin` | Unrestricted editorial, site settings, page builder, user access |
| `editor@theconclusiveindian.in` | `Editor@TCI2026!` | `editor` | News publishing, revisions, categories, breaking alerts |
| `reporter@theconclusiveindian.in`| `Author@TCI2026!` | `author` | Draft creation, personal article edits, media uploads |

---

## 🌐 OpenAPI Interactive Documentation

Interactive Swagger/OpenAPI documentation is auto-generated for each service:

- **API Gateway Aggregator / Health:** `http://localhost:8000/docs`
- **Identity Service:** `http://localhost:8001/docs`
- **User Service:** `http://localhost:8002/docs`
- **Taxonomy Service:** `http://localhost:8003/docs`
- **Content Service:** `http://localhost:8004/docs`
- **Page Builder:** `http://localhost:8005/docs`
- **Media Service:** `http://localhost:8006/docs`
- **Contact Service:** `http://localhost:8007/docs`
