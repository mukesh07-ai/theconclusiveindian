# Deployment & Local Development Guide

## 1. Prerequisites
- Docker (version 24+) & Docker Compose (version 2.20+)
- Python 3.11+
- Node.js 20+ & npm 10+
- MySQL 8.0+ (provided via Docker Compose or native instance)

---

## 2. Local Docker Compose Architecture

The development orchestration spins up:
1. `mysql`: MySQL 8.0 server with pre-initialized logical databases:
   - `tci_identity_db`
   - `tci_users_db`
   - `tci_taxonomy_db`
   - `tci_content_db`
   - `tci_pages_db`
   - `tci_media_db`
   - `tci_contact_db`
2. `identity-service` (Port 8001)
3. `user-service` (Port 8002)
4. `taxonomy-service` (Port 8003)
5. `content-service` (Port 8004)
6. `page-builder-service` (Port 8005)
7. `media-service` (Port 8006)
8. `contact-moderation-service` (Port 8007)
9. `api-gateway` (Port 8000)
10. `frontend` (Port 3000)

---

## 3. Quick Start (Native & Docker Options)

### Option A: Complete Docker Compose
```bash
# In project root
docker compose up --build -d

# Check service health
docker compose ps
curl http://localhost:8000/api/v1/health
```

### Option B: Local Python Development
```bash
# Create shared virtual environment
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt

# Run database initialization script
python backend/scripts/init_databases.py

# Start individual microservice (e.g. Identity Service)
uvicorn backend.services.identity_service.app.main:app --port 8001 --reload

# Start Gateway
uvicorn backend.gateway.app.main:app --port 8000 --reload
```

---

## 4. Default Seed Credentials (Local Development)

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@theconclusiveindian.in` | `Admin@TCI2026!` |
| **Editor** | `editor@theconclusiveindian.in` | `Editor@TCI2026!` |
| **Author** | `author@theconclusiveindian.in` | `Author@TCI2026!` |

> **Note**: Change these passwords immediately in staging and production environments via environment variables.
