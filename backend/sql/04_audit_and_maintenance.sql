-- ==============================================================================
-- The Conclusive Indian (द कन्क्लूसिव इंडियन)
-- Database Auditing, Health Checks & Periodic Maintenance Procedures
-- Target Database: theconclusiveindian_db
-- ==============================================================================

USE `theconclusiveindian_db`;

-- ==============================================================================
-- 1. DATABASE INTEGRITY & TABLE STATUS INSPECTION
-- Run this query to verify all 18 tables, their row counts, and storage engines.
-- ==============================================================================
SELECT 
    table_name AS `Table`,
    table_rows AS `Approximate Rows`,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS `Size (MB)`,
    table_collation AS `Collation`,
    engine AS `Engine`
FROM information_schema.tables
WHERE table_schema = 'theconclusiveindian_db'
ORDER BY table_name ASC;

-- ==============================================================================
-- 2. VERIFY PRIMARY & FOREIGN KEY CONSTRAINTS
-- Ensures referential integrity across identity, taxonomy, and content tables.
-- ==============================================================================
SELECT 
    CONSTRAINT_NAME, 
    TABLE_NAME, 
    COLUMN_NAME, 
    REFERENCED_TABLE_NAME, 
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'theconclusiveindian_db' 
  AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME, CONSTRAINT_NAME;

-- ==============================================================================
-- 3. INDEX OPTIMIZATION & USAGE AUDIT
-- Lists all non-primary indexes guarding against full-table scans.
-- ==============================================================================
SELECT 
    TABLE_NAME, 
    INDEX_NAME, 
    NON_UNIQUE, 
    GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS `Indexed Columns`
FROM information_schema.STATISTICS
WHERE TABLE_SCHEMA = 'theconclusiveindian_db' 
  AND INDEX_NAME != 'PRIMARY'
GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
ORDER BY TABLE_NAME, INDEX_NAME;

-- ==============================================================================
-- 4. CLEANUP PROCEDURE: PURGE EXPIRED REVOKED TOKENS
-- JWT tokens older than 30 days are automatically expired by JWT lifetime,
-- so blacklist records older than 30 days can be safely purged.
-- ==============================================================================
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS `sp_purge_expired_revoked_tokens`()
BEGIN
    DELETE FROM `theconclusiveindian_db`.`revoked_tokens`
    WHERE `revoked_at` < DATE_SUB(NOW(), INTERVAL 30 DAY);
    
    SELECT ROW_COUNT() AS `purged_revoked_tokens_count`;
END //

DELIMITER ;

-- ==============================================================================
-- 5. AUDIT TRAIL MAINTENANCE (ARCHIVAL CANDIDATES)
-- Identifies audit logs older than 180 days for cold archival.
-- ==============================================================================
SELECT 
    COUNT(*) AS `audit_records_older_than_180_days`
FROM `theconclusiveindian_db`.`audit_logs`
WHERE `created_at` < DATE_SUB(NOW(), INTERVAL 180 DAY);

-- ==============================================================================
-- 6. FULL DEVANAGARI UNICODE VALIDATION QUERY
-- Validates that Devanagari Hindi characters are stored and retrieved intact
-- without encoding corruption or question mark replacements.
-- ==============================================================================
SELECT 
    id, 
    title, 
    category_name, 
    author_name, 
    HEX(LEFT(title, 5)) AS `devanagari_hex_validation`
FROM `theconclusiveindian_db`.`articles`
LIMIT 5;

-- ==============================================================================
-- 7. REPAIR & OPTIMIZE ALL CORE TABLES
-- Reclaims fragmented storage and updates table statistics for the query optimizer.
-- ==============================================================================
OPTIMIZE TABLE 
    `roles`, 
    `users`, 
    `user_roles`, 
    `authors`, 
    `categories`, 
    `tags`, 
    `articles`, 
    `breaking_news`, 
    `video_stories`, 
    `photo_stories`, 
    `opinion_articles`, 
    `homepage_sections`, 
    `site_settings`, 
    `static_pages`, 
    `navigation_items`, 
    `media_assets`, 
    `contact_submissions`, 
    `audit_logs`;
