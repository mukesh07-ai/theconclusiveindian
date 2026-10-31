# Security Architecture & RBAC Policy

## 1. Threat Model & Protections
The Conclusive Indian platform enforces defense-in-depth across the API Gateway, downstream microservices, database, and Next.js frontend.

### 1.1 Identity & Passwords
- **Algorithm**: Argon2id (or bcrypt when argon2 library is not natively linked).
- **Salt**: Cryptographically secure random 16-byte salt automatically managed per hash.
- **Complexity**: Minimum 8 characters, requiring mixed alphanumeric.

### 1.2 Tokens & Sessions
- **Access Token**: Short-lived JWT (30-minute validity) signed using `HS256` or `RS256` with secret key rotated per environment.
- **Claims**: `sub` (User ID), `email`, `role`, `exp`, `iat`, `jti`.
- **Revocation**: Handled via blacklisted `jti` in Identity Service.
- **Browser Storage**: Transmitted via Bearer headers or HttpOnly, Secure, SameSite=Lax cookies to mitigate XSS attacks.

### 1.3 Injection & Input Sanitization
- **SQL Injection**: SQLAlchemy 2.0 with parameterized queries everywhere. Direct string concatenation in SQL is prohibited.
- **XSS Prevention**: React DOM escapes all text content natively. Body HTML fields in articles are sanitized on ingestion.
- **Devanagari Unicode Safety**: All endpoints accept valid UTF-8 and strip dangerous control characters.

### 1.4 Rate Limiting & Edge Protection
- API Gateway throttles unauthenticated requests (e.g. 60 req/min for general API, 5 req/min for `/auth/login` to deter credential stuffing).

---

## 2. RBAC Roles & Capabilities

| Role | Description |
|---|---|
| **super_admin** | Complete system authority. Role modification, database administration, full audit log access. |
| **editor_in_chief** | Editorial authority. Direct publishing rights, article approval, desk assignments, site-wide layout. |
| **editor** | Article review, editing, scheduling, taxonomy tag management, media asset uploading. |
| **author** | Article drafting and updating own articles, submitting drafts for review. |
| **reporter** | Draft submission from field, uploading multimedia assets. |
| **moderator** | Review reader contact submissions, redressal grievances, and comments. |
| **reader** | Public viewing, search, newsletter subscription, feedback submission. |
