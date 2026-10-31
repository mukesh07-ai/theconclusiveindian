-- ==============================================================================
-- The Conclusive Indian (द कन्क्लूसिव इंडियन)
-- MySQL Database Initialization Script (Single Consolidated Database)
-- Database: theconclusiveindian_db
-- Collation: utf8mb4_unicode_ci (Full Devanagari Hindi Unicode Support)
-- ==============================================================================

-- 1. Create Consolidated Application Database
CREATE DATABASE IF NOT EXISTS `theconclusiveindian_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Create Application User with Access to the Consolidated Database
CREATE USER IF NOT EXISTS 'tci_user'@'%' IDENTIFIED BY 'tci_password_local';
GRANT ALL PRIVILEGES ON `theconclusiveindian_db`.* TO 'tci_user'@'%';

FLUSH PRIVILEGES;
