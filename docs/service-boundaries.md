# Service Boundaries & Domain Isolation Specification

## 1. Domain Separation Principles
In accordance with strict microservice design, services in The Conclusive Indian communicate exclusively via documented HTTP APIs and shared event contracts. No microservice accesses the database or internal storage of another service.

---

## 2. Microservice Manifest

### 1. API Gateway
- **Directory**: `backend/gateway`
- **Internal Port**: 8000
- **Public Entry Point**: `http://localhost:8000/api/v1`
- **Routing Rules**:
  - `/api/v1/auth/*` -> Identity Service (8001)
  - `/api/v1/users/*`, `/api/v1/authors/*` -> User Service (8002)
  - `/api/v1/categories/*`, `/api/v1/tags/*` -> Taxonomy Service (8003)
  - `/api/v1/articles/*`, `/api/v1/breaking-news/*`, `/api/v1/multimedia/*` -> Content Service (8004)
  - `/api/v1/homepage/*`, `/api/v1/navigation/*`, `/api/v1/site-config/*`, `/api/v1/pages/*` -> Page Builder Service (8005)
  - `/api/v1/media/*` -> Media Service (8006)
  - `/api/v1/contact/*`, `/api/v1/admin/moderation/*` -> Contact & Moderation Service (8007)

### 2. Identity Service (`backend/services/identity-service`)
- **Port**: 8001
- **Database**: `tci_identity_db`
- **Responsibilities**:
  - User authentication (email/password, Argon2id/bcrypt)
  - JWT token minting, verification, and revocation
  - RBAC Role definitions & permissions assignment
  - User session audit logs
- **Invariants**:
  - Plaintext passwords never logged or stored.
  - Role escalation strictly prevented at API validation layer.

### 3. User & Profile Service (`backend/services/user-service`)
- **Port**: 8002
- **Database**: `tci_users_db`
- **Responsibilities**:
  - Public author profiles (Hindi/English names, roles, bios, avatars, social links)
  - Editorial staff directory
  - Reader preferences and reading history bookmarks

### 4. Taxonomy Service (`backend/services/taxonomy-service`)
- **Port**: 8003
- **Database**: `tci_taxonomy_db`
- **Responsibilities**:
  - Category taxonomy (all 12 national news categories)
  - Subcategories and topic clusters
  - Devanagari Hindi tag registry with normalized URL slugs
  - Ordering and active status flags

### 5. Content & Editorial Service (`backend/services/content-service`)
- **Port**: 8004
- **Database**: `tci_content_db`
- **Responsibilities**:
  - Article repository with versioned lifecycle (`draft`, `review`, `scheduled`, `published`, `archived`)
  - Hindi headlines, excerpts, Devanagari rich-text body, SEO metadata
  - Live breaking news ticker item management with urgency flags
  - Video stories and photo galleries
  - Editorial opinion pieces
  - Automated background task for scheduled publishing
- **Dependencies**:
  - Calls Taxonomy Service to validate category IDs
  - Calls User Service to validate author IDs

### 6. Page Builder & Configuration Service (`backend/services/page-builder-service`)
- **Port**: 8005
- **Database**: `tci_pages_db`
- **Responsibilities**:
  - Homepage dynamic sections layout (section ordering, visibility, variants)
  - Global site settings (branding, taglines, contact info, social links, compliance officers)
  - Navigation menu hierarchy (top utility bar, main header, drawer, footer)
  - Static policy pages (About Us, Editorial Policy, Grievance Redressal, etc.)

### 7. Media Service (`backend/services/media-service`)
- **Port**: 8006
- **Database**: `tci_media_db`
- **Responsibilities**:
  - Media asset ingestion with magic-byte and MIME validation
  - Local disk storage driver (extensible to S3/R2)
  - Media metadata: Hindi/English alt text, captions, photographer credit, dimensions

### 8. Contact & Moderation Service (`backend/services/contact-moderation-service`)
- **Port**: 8007
- **Database**: `tci_contact_db`
- **Responsibilities**:
  - Feedback submissions & news tips
  - Formal Grievance Redressal tickets under IT Rules 2021
  - Editorial correction requests
  - Moderation workflow with ticket status (`pending`, `under_review`, `resolved`, `dismissed`)
