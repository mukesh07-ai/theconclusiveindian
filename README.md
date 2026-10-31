# The Conclusive Indian (द कन्क्लूसिव इंडियन)
> **"निष्पक्ष • निर्भीक • निर्णायक"**  
> Modern Hindi Digital News Publication Platform & Enterprise Microservices Architecture

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

---

## 📖 Overview

**The Conclusive Indian (द कन्क्लूसिव इंडियन)** is a production-grade digital journalism portal and content management ecosystem engineered for Indian readership. It pairs an editorial Next.js 16 frontend and comprehensive admin dashboard with an asynchronous, decoupled Python/FastAPI microservices suite and dedicated MySQL databases.

The repository is structured as a decoupled **Polyglot Monorepo**:
- **`frontend/`**: Next.js 16 (App Router) + React 19 + Tailwind CSS + Full-featured Editorial Admin Dashboard (`/admin`).
- **`backend/`**: 7 independent FastAPI microservices + API Gateway (Port 8000) + Docker Compose + Pytest suite.
- **`docs/`**: Architecture diagrams, service boundaries, database designs, security matrices, and deployment runbooks.

---

## 🏛️ System Architecture

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
                                      │ Connection Pool (Alembic Managed)
                                      ▼
                ┌──────────────────────────────────────────────┐
                │    Centralized MySQL 8.0 Application DB      │
                │          `theconclusiveindian_db`            │
                │   utf8mb4_unicode_ci | Unified Database      │
                └──────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```text
theconclusiveindian/
├── frontend/                               # Next.js frontend application (App Router)
│   ├── public/                             # Brand assets (logo, favicons, OG cards)
│   ├── src/
│   │   ├── app/                            # Public routes & Editorial Admin Console
│   │   │   ├── admin/                      # Complete Admin Dashboard
│   │   │   │   ├── articles/               # News CRUD, status pills, filter tabs
│   │   │   │   │   ├── create/             # Article authoring composer
│   │   │   │   │   └── [id]/edit/          # Article editor
│   │   │   │   ├── breaking-news/          # Live ticker alert manager
│   │   │   │   ├── categories/             # Category manager with color pickers
│   │   │   │   ├── contact-feedback/       # IT Rules 2021 Grievance & feedback queue
│   │   │   │   ├── dashboard/              # KPI cards & recent articles
│   │   │   │   ├── login/                  # Credentials login with quick-fill presets
│   │   │   │   ├── media/                  # Media asset library & file uploader
│   │   │   │   ├── page-builder/           # Dynamic homepage section order & toggles
│   │   │   │   └── site-settings/          # Global branding, contact & grievance officer
│   │   │   ├── category/[slug]/            # 12 Category hubs (National, Politics, etc.)
│   │   │   ├── news/[slug]/                # Full article detail route + Schema.org JSON-LD
│   │   │   ├── search/                     # Bilingual relevance search
│   │   │   └── layout.tsx                  # Public layout with masthead & live scroller
│   │   ├── context/                        # AdminAuthContext.tsx & LanguageContext.tsx
│   │   ├── services/                       # adminService.ts & newsService.ts
│   │   └── lib/api.ts                      # Centralized API client with transparent fallback
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                                # Enterprise Python FastAPI Microservices
│   ├── gateway/                            # Port 8000: Reverse proxy, CORS, health aggregator
│   ├── services/                           # Dedicated independent services
│   │   ├── identity-service/               # Port 8001: JWT, bcrypt, RBAC roles
│   │   ├── user-service/                   # Port 8002: Author profiles & bios
│   │   ├── taxonomy-service/               # Port 8003: 12 news categories & Hindi tags
│   │   ├── content-service/                # Port 8004: Articles, breaking ticker, scheduled worker
│   │   ├── page-builder-service/           # Port 8005: Homepage layout & global settings
│   │   ├── media-service/                  # Port 8006: File uploads, validation & storage
│   │   └── contact-moderation-service/     # Port 8007: Grievances & feedback ticketing
│   ├── shared/contracts/                   # Cross-service schemas, models, pagination & security
│   ├── infrastructure/
│   │   └── mysql/init.sql                  # Automated 7-database schema provisioner
│   ├── scripts/
│   │   ├── run_local_services.sh           # Native local dev orchestrator script
│   │   └── init_databases.py               # Table creation runner
│   ├── tests/                              # Pytest test suite (100% passing)
│   │   └── test_services.py
│   ├── docker-compose.yml                  # Full multi-container composition
│   ├── requirements.txt                    # Python dependencies
│   └── README.md
│
├── docs/                                   # Architectural Blueprints & Specs
│   ├── architecture.md                     # End-to-end topology & data flows
│   ├── service-boundaries.md               # Domain boundaries & isolation principles
│   ├── database-design.md                  # MySQL isolated database schema specifications
│   ├── security.md                         # RBAC matrix, password hashing & JWT lifecycle
│   └── deployment.md                       # Production & local deployment runbook
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start

### 1. Run the Backend Microservices

#### Option A: Native Development (Recommended)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
./scripts/run_local_services.sh
```

#### Option B: Docker Compose
```bash
cd backend
docker-compose up --build
```

The services will be active on:
- **API Gateway:** `http://localhost:8000` (Docs: `http://localhost:8000/docs`)
- **Identity Service:** `http://localhost:8001`
- **User Service:** `http://localhost:8002`
- **Taxonomy Service:** `http://localhost:8003`
- **Content Service:** `http://localhost:8004`
- **Page Builder:** `http://localhost:8005`
- **Media Service:** `http://localhost:8006`
- **Contact Service:** `http://localhost:8007`

---

### 2. Run the Next.js Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit:
- **Public Portal:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

#### Pre-configured Seed Credentials for Admin Login:

| Email | Password | Role |
|---|---|---|
| `admin@theconclusiveindian.in` | `Admin@TCI2026!` | `super_admin` |
| `editor@theconclusiveindian.in` | `Editor@TCI2026!` | `editor` |
| `reporter@theconclusiveindian.in` | `Author@TCI2026!` | `author` |

---

## 🧪 Validation & Testing

### Backend Unit & Integration Tests (100% Passing)
```bash
cd backend
./venv/bin/pytest tests/test_services.py -v
```

### Frontend Type-Check & Production Build
```bash
cd frontend
npm run type-check    # 0 TypeScript errors
npm run lint          # 0 ESLint errors, 0 warnings
npm run build         # Prerenders all 204 public & admin routes
```

---

## 📜 Regulatory & Ethics Compliance

The platform is engineered to strictly satisfy India's **Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021** and the **Digital Personal Data Protection (DPDP) Act**:
- **Designated Grievance Redressal Officer (शिकायत निवारण अधिकारी)** with unique ticket generation (`TCI-YYYYMMDD-XXXXXX`).
- Transparent **Fact-Checking & Corrections Policy** with revision histories.
- Granular **Editorial Workflows** (Draft ➔ Review ➔ Scheduled ➔ Published ➔ Archived).
