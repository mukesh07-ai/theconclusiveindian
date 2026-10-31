# Database Architecture & SQL Configuration

## The Conclusive Indian (द कन्क्लूसिव इंडियन)
**Database Engine**: MySQL 8.0+ / 9.x  
**Database Name**: `u738606952_theconclusive`  
**Character Set**: `utf8mb4`  
**Collation**: `utf8mb4_unicode_ci` (Full Devanagari Hindi Unicode Support)

---

## 1. Single Database Architecture Rationale

The entire platform consolidates all relational data into a single, highly-optimized MySQL database (`u738606952_theconclusive`).

### Key Benefits over Multiple Fragmented Databases:
1. **Relational Integrity & ACID Guarantees**: Allows strict foreign key constraints between articles, categories, authors, and users without fragile cross-database joins or distributed two-phase commit overhead.
2. **Breach Prevention & Attack Surface Reduction**: A single unified database allows unified role-based permissions, centralized auditing, and streamlined credential rotation.
3. **Optimized Resource Consumption**: Prevents connection pool multiplication and memory bloat on production database servers.
4. **Simplified Disaster Recovery & Backups**: A single point of consistent point-in-time recovery via standard MySQL binary logging (`binlog`) and `mysqldump`.

---

## 2. Directory Structure

```
backend/sql/
├── 01_schema.sql               # Complete DDL: 18 tables, constraints, foreign keys, indexes
├── 02_seed_data.sql            # Seed data: roles, users, authors, categories, articles, settings
├── 03_security_and_grants.sql  # Least-privilege application user setup & security hardening
├── 04_audit_and_maintenance.sql# Health checks, index analysis, JWT blacklist cleanup procedure
├── init.sql                    # All-in-one master idempotent initialization script
└── README.md                   # This architectural guide
```

---

## 3. Database Schema Overview (18 Relational Tables)

| Domain | Table Name | Purpose | Key Indexes & Constraints |
| :--- | :--- | :--- | :--- |
| **Identity & RBAC** | `roles` | System roles (super_admin, editor, author, etc.) | PK: `name` |
| | `users` | User accounts with bcrypt hashed passwords | PK: `id`, Unique: `email`, Index: `is_active` |
| | `user_roles` | Many-to-many junction between users and roles | Compound PK: `(user_id, role_name)`, Foreign Keys |
| | `revoked_tokens` | Blacklisted JWT tokens on logout | PK: `jti`, Index: `revoked_at` |
| **Taxonomy & Editorial** | `authors` | Verified journalists, columnists, and bio data | PK: `id`, Unique: `slug` |
| | `categories` | 12 primary national news sections | PK: `id`, Unique: `slug`, Index: `display_order` |
| | `tags` | Topic and hashtag taxonomy | PK: `id`, Unique: `slug`, Index: `is_trending` |
| | `articles` | Core news reports, investigative pieces, stories | PK: `id`, Unique: `slug`, Indexes: `category_slug`, `published_at` |
| | `breaking_news` | Real-time breaking ticker headlines | PK: `id`, Index: `is_active`, `created_at` |
| | `video_stories` | Video bulletins and multimedia reports | PK: `id`, Unique: `slug`, Index: `is_featured` |
| | `photo_stories` | Photo essays and visual journalism | PK: `id`, Unique: `slug` |
| | `opinion_articles` | Editorial columns and thought leadership | PK: `id`, Unique: `slug`, Index: `published_at` |
| **CMS & Site Config** | `homepage_sections` | Dynamic homepage layout and ordering | PK: `id`, Index: `display_order`, `is_enabled` |
| | `site_settings` | Global brand JSON configuration & compliance | PK: `key` |
| | `static_pages` | Static legal, grievance, and policy pages | PK: `slug` |
| | `navigation_items` | Header and footer menu tree | PK: `id`, Index: `menu_location`, `display_order` |
| **Media Repository** | `media_assets` | Uploaded images, captions, and credits | PK: `id`, Indexes: `created_at`, `mime_type` |
| **Compliance (IT Rules)** | `contact_submissions`| Grievances and public contact tickets | PK: `id`, Unique: `ticket_id`, Index: `status` |
| **Security & Auditing** | `audit_logs` | Immutable administrative audit trail | PK: `id` (Auto-inc), Indexes: `user_id`, `action` |

---

## 4. Security Hardening & Breach Prevention Measures

1. **Principle of Least Privilege**:
   - Web microservices connect via `tci_app_user` rather than `root`.
   - `tci_app_user` possesses only `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `EXECUTE` rights.
   - Administrative DDL operations (`DROP`, `ALTER`, `CREATE`, `GRANT`, `SUPER`) are strictly disabled for the application user, stopping SQL injection payload escalations from destroying the database.

2. **Immutable Audit Trail**:
   - `UPDATE` and `DELETE` permissions on `audit_logs` are revoked from the application user. Audit entries cannot be tampered with or erased via application vectors.

3. **Devanagari Unicode Protection (`utf8mb4_unicode_ci`)**:
   - Complete 4-byte UTF-8 encoding ensures Hindi text, conjuncts, matras, and emojis are stored natively without character-set truncation or encoding exploit vectors.

4. **Parameterized Queries & ORM**:
   - All backend microservices interface with MySQL using SQLAlchemy 2.0 async sessions (`mysql+aiomysql`) with parameterized queries, eliminating SQL injection risks.

5. **Resource Limits**:
   - Connection throttling prevents connection starvation and DoS attacks (`MAX_USER_CONNECTIONS 150`).

---

## 5. Execution & Deployment Guide

### Option A: Direct MySQL Execution (Local / Server)

Execute the master initialization script against your MySQL instance:

```bash
# Using root credentials:
mysql -u root -p'MYSQLTEST' < backend/sql/init.sql
```

Alternatively, run each modular script in sequence:

```bash
mysql -u root -p'MYSQLTEST' < backend/sql/01_schema.sql
mysql -u root -p'MYSQLTEST' < backend/sql/02_seed_data.sql
mysql -u root -p'MYSQLTEST' < backend/sql/03_security_and_grants.sql
```

### Option B: Docker Compose

The `init.sql` file is mounted inside `/docker-entrypoint-initdb.d/init.sql` in `backend/docker-compose.yml`, ensuring clean automated container initialization on startup.

### Option C: Python Database Bootstrapper

Run the automated async Python migration tool:

```bash
cd backend
source venv/bin/activate
python scripts/init_databases.py
```

---

## 6. Periodic Maintenance (Database Operations)

Run `backend/sql/04_audit_and_maintenance.sql` periodically to:
- Verify table row counts and index fragmentation.
- Purge expired JWT tokens older than 30 days (`CALL sp_purge_expired_revoked_tokens();`).
- Identify audit logs older than 180 days for cold storage archival.
- Run `OPTIMIZE TABLE` on all core entities to maintain B-tree index efficiency.
