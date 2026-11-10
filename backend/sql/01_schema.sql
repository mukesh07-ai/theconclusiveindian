-- ==============================================================================
-- The Conclusive Indian (द कन्क्लूसिव इंडियन)
-- Unified Database Schema Definition (Single Database Architecture)
-- Database: u738606952_theconclusive
-- Collation: utf8mb4_unicode_ci (Full Devanagari Hindi Unicode Support)
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Create Consolidated Database
CREATE DATABASE IF NOT EXISTS `u738606952_theconclusive`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `u738606952_theconclusive`;

-- ==============================================================================
-- SECTION A: IDENTITY & ACCESS MANAGEMENT (RBAC)
-- ==============================================================================

-- Roles Table
CREATE TABLE IF NOT EXISTS `roles` (
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `must_change_password` TINYINT(1) NOT NULL DEFAULT 0,
  `failed_login_attempts` INT NOT NULL DEFAULT 0,
  `locked_until` DATETIME NULL,
  `permissions_json` TEXT NULL,
  `last_login_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  KEY `idx_users_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Roles Junction Table
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` VARCHAR(36) NOT NULL,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`, `role_name`),
  KEY `idx_user_roles_role_name` (`role_name`),
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Revoked JWT Tokens (Token Blacklist)
CREATE TABLE IF NOT EXISTS `revoked_tokens` (
  `jti` VARCHAR(255) NOT NULL,
  `revoked_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`jti`),
  KEY `idx_revoked_tokens_date` (`revoked_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION B: AUTHORS & USER PROFILES
-- ==============================================================================

-- Authors / Columnists Table
CREATE TABLE IF NOT EXISTS `authors` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `english_name` VARCHAR(255) NULL,
  `slug` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `avatar` VARCHAR(1000) NULL,
  `twitter` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_authors_slug` (`slug`),
  KEY `idx_authors_name` (`name`),
  KEY `idx_authors_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION C: TAXONOMY (CATEGORIES & TAGS)
-- ==============================================================================

-- Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `english_name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `color` VARCHAR(50) NOT NULL DEFAULT '#1E3A8A',
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`),
  KEY `idx_categories_active_order` (`is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tags Table
CREATE TABLE IF NOT EXISTS `tags` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `usage_count` INT NOT NULL DEFAULT 1,
  `is_trending` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tags_name` (`name`),
  UNIQUE KEY `uq_tags_slug` (`slug`),
  KEY `idx_tags_trending` (`is_trending`),
  KEY `idx_tags_usage_count` (`usage_count` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION D: EDITORIAL & CONTENT MANAGEMENT
-- ==============================================================================

-- Articles Table
CREATE TABLE IF NOT EXISTS `articles` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `english_title` VARCHAR(500) NULL,
  `slug` VARCHAR(500) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `featured_image` VARCHAR(1000) NOT NULL,
  `image_alt` VARCHAR(500) NOT NULL,
  `image_caption` VARCHAR(500) NULL,
  `image_credit` VARCHAR(255) NULL,
  
  -- Foreign Key Denormalized References
  `category_slug` VARCHAR(100) NOT NULL,
  `category_name` VARCHAR(100) NOT NULL,
  `author_slug` VARCHAR(100) NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_role` VARCHAR(255) NULL,
  `author_avatar` VARCHAR(1000) NULL,
  
  -- Publishing Workflow State
  `status` VARCHAR(50) NOT NULL DEFAULT 'published',
  `tags_csv` TEXT NULL,
  
  -- Editorial Workflow & SEO Extensions
  `editorial_notes` TEXT NULL,
  `approved_by` VARCHAR(36) NULL,
  `approved_at` DATETIME NULL,
  `submitted_at` DATETIME NULL,
  `seo_title` VARCHAR(500) NULL,
  `meta_description` TEXT NULL,
  `focus_keyword` VARCHAR(255) NULL,
  `canonical_url` VARCHAR(1000) NULL,
  `og_image` VARCHAR(1000) NULL,
  `no_index` TINYINT(1) NOT NULL DEFAULT 0,

  -- Flags & Metrics
  `is_breaking` TINYINT(1) NOT NULL DEFAULT 0,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_trending` TINYINT(1) NOT NULL DEFAULT 0,
  `view_count` INT NOT NULL DEFAULT 100,
  `read_time_minutes` INT NOT NULL DEFAULT 4,
  
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scheduled_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_articles_slug` (`slug`(255)),
  KEY `idx_articles_status_pub` (`status`, `published_at` DESC),
  KEY `idx_articles_cat_pub` (`category_slug`, `published_at` DESC),
  KEY `idx_articles_auth_pub` (`author_slug`, `published_at` DESC),
  KEY `idx_articles_breaking` (`is_breaking`),
  KEY `idx_articles_featured` (`is_featured`),
  KEY `idx_articles_trending` (`is_trending`),
  KEY `idx_articles_views` (`view_count` DESC),
  CONSTRAINT `fk_articles_category` FOREIGN KEY (`category_slug`) REFERENCES `categories` (`slug`) ON UPDATE CASCADE,
  CONSTRAINT `fk_articles_author` FOREIGN KEY (`author_slug`) REFERENCES `authors` (`slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Article Tags Junction Table (Normalized relational mapping)
CREATE TABLE IF NOT EXISTS `article_tags` (
  `article_id` VARCHAR(50) NOT NULL,
  `tag_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`article_id`, `tag_id`),
  KEY `idx_article_tags_tag` (`tag_id`),
  CONSTRAINT `fk_article_tags_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_article_tags_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Breaking News Live Ticker Table
CREATE TABLE IF NOT EXISTS `breaking_news` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'देश',
  `timestamp_text` VARCHAR(100) NOT NULL DEFAULT 'अभी-अभी',
  `is_urgent` TINYINT(1) NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_breaking_news_active` (`is_active`, `is_urgent`, `created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Video Stories Table
CREATE TABLE IF NOT EXISTS `video_stories` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) NOT NULL,
  `thumbnail` VARCHAR(1000) NOT NULL,
  `duration` VARCHAR(50) NOT NULL DEFAULT '15:00',
  `category_slug` VARCHAR(100) NOT NULL DEFAULT 'national',
  `category_name` VARCHAR(100) NOT NULL DEFAULT 'देश',
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` VARCHAR(50) NOT NULL DEFAULT '10K',
  `youtube_id` VARCHAR(100) NULL,
  `youtube_url` VARCHAR(500) NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `guest` VARCHAR(255) NULL,
  `channel_name` VARCHAR(255) NOT NULL DEFAULT 'The Conclusive Indian',
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_video_stories_slug` (`slug`(255)),
  KEY `idx_video_stories_cat` (`category_slug`),
  KEY `idx_video_stories_featured` (`is_featured`),
  CONSTRAINT `fk_videos_category` FOREIGN KEY (`category_slug`) REFERENCES `categories` (`slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Photo Stories Table
CREATE TABLE IF NOT EXISTS `photo_stories` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) NOT NULL,
  `thumbnail` VARCHAR(1000) NOT NULL,
  `photo_count` INT NOT NULL DEFAULT 6,
  `category_slug` VARCHAR(100) NOT NULL DEFAULT 'national',
  `category_name` VARCHAR(100) NOT NULL DEFAULT 'देश',
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_photo_stories_slug` (`slug`(255)),
  KEY `idx_photo_stories_cat` (`category_slug`),
  CONSTRAINT `fk_photos_category` FOREIGN KEY (`category_slug`) REFERENCES `categories` (`slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Opinion Articles Table
CREATE TABLE IF NOT EXISTS `opinion_articles` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_role` VARCHAR(255) NULL,
  `author_avatar` VARCHAR(1000) NULL,
  `author_slug` VARCHAR(100) NOT NULL DEFAULT 'raghavendra-shukla',
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_time_minutes` INT NOT NULL DEFAULT 5,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_opinion_articles_slug` (`slug`(255)),
  KEY `idx_opinion_articles_author` (`author_slug`),
  CONSTRAINT `fk_opinions_author` FOREIGN KEY (`author_slug`) REFERENCES `authors` (`slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION E: DYNAMIC PAGE BUILDER & SITE CONFIGURATION
-- ==============================================================================

-- Homepage Sections Table
CREATE TABLE IF NOT EXISTS `homepage_sections` (
  `id` VARCHAR(50) NOT NULL,
  `section_type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `config_json` TEXT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_homepage_sections_order` (`is_enabled`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Global Site Settings Table (Key-Value JSON store)
CREATE TABLE IF NOT EXISTS `site_settings` (
  `key` VARCHAR(100) NOT NULL,
  `value_json` LONGTEXT NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Static Policy & Information Pages
CREATE TABLE IF NOT EXISTS `static_pages` (
  `slug` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `hindi_title` VARCHAR(255) NOT NULL,
  `content_markdown` LONGTEXT NOT NULL,
  `meta_description` TEXT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Navigation Menus Table
CREATE TABLE IF NOT EXISTS `navigation_items` (
  `id` VARCHAR(50) NOT NULL,
  `menu_location` VARCHAR(50) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  `href` VARCHAR(500) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_navigation_items_location` (`menu_location`, `is_active`, `display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION F: MEDIA ASSET MANAGEMENT
-- ==============================================================================

-- Media Assets Table
CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` VARCHAR(50) NOT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `original_filename` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `file_size_bytes` INT NOT NULL,
  `storage_path` VARCHAR(500) NOT NULL,
  `public_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(500) NULL,
  `caption` VARCHAR(500) NULL,
  `credit` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_media_assets_created` (`created_at` DESC),
  KEY `idx_media_assets_mime` (`mime_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION G: CONTACT, COMPLIANCE & GRIEVANCES (IT RULES 2021)
-- ==============================================================================

-- Contact & Grievance Submissions Table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` VARCHAR(50) NOT NULL,
  `ticket_id` VARCHAR(50) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `category` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(500) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `internal_notes` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_contact_ticket_id` (`ticket_id`),
  KEY `idx_contact_status` (`status`, `created_at` DESC),
  KEY `idx_contact_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION G2: ADVERTISEMENT MANAGEMENT & CAMPAIGNS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS `advertisements` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `advertiser_name` VARCHAR(255) NOT NULL,
  `destination_url` VARCHAR(1000) NOT NULL,
  `creative_desktop_url` VARCHAR(1000) NOT NULL,
  `creative_mobile_url` VARCHAR(1000) NULL,
  `placement_positions` VARCHAR(500) NOT NULL,
  `ad_type` VARCHAR(50) NOT NULL DEFAULT 'image_banner',
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `priority` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `impressions_count` INT NOT NULL DEFAULT 0,
  `clicks_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ads_is_active` (`is_active`),
  KEY `idx_ads_priority` (`priority` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- URL 301 Redirects Table
CREATE TABLE IF NOT EXISTS `url_redirects` (
  `id` VARCHAR(50) NOT NULL,
  `source_path` VARCHAR(500) NOT NULL,
  `target_path` VARCHAR(500) NOT NULL,
  `status_code` INT NOT NULL DEFAULT 301,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_url_redirects_source` (`source_path`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SECTION H: AUDIT LOGS & SECURITY TRAIL
-- ==============================================================================

-- Administrative Audit Logs Table
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(36) NULL,
  `user_email` VARCHAR(255) NULL,
  `action` VARCHAR(100) NOT NULL,
  `resource_type` VARCHAR(100) NOT NULL,
  `resource_id` VARCHAR(255) NULL,
  `details_json` LONGTEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(500) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_logs_user` (`user_id`, `created_at` DESC),
  KEY `idx_audit_logs_action` (`action`, `created_at` DESC),
  KEY `idx_audit_logs_resource` (`resource_type`, `resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Enforce Immutability on Audit Logs (Append-Only Security Ledger)
DROP TRIGGER IF EXISTS `trg_audit_logs_prevent_update`;
DROP TRIGGER IF EXISTS `trg_audit_logs_prevent_delete`;

DELIMITER //

CREATE TRIGGER `trg_audit_logs_prevent_update`
BEFORE UPDATE ON `audit_logs`
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Security Policy Violation: audit_logs entries are immutable and cannot be updated.';
END //

CREATE TRIGGER `trg_audit_logs_prevent_delete`
BEFORE DELETE ON `audit_logs`
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Security Policy Violation: audit_logs entries are immutable and cannot be deleted.';
END //

DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;
