-- ==============================================================================
-- The Conclusive Indian (द कन्क्लूसिव इंडियन)
-- Database Security, User Hardening & Principle of Least Privilege
-- Target Database: u738606952_theconclusive
-- ==============================================================================

-- 1. Security Overview:
-- Dedicated application user credentials for Hostinger:
-- Database: u738606952_theconclusive
-- User: u738606952_theconclusive

-- 2. Create Dedicated Application Service User (Optional for self-managed MySQL)
CREATE USER IF NOT EXISTS 'tci_app_user'@'localhost' 
  IDENTIFIED BY 'TCI_Secure_App_Pass_2026!';

CREATE USER IF NOT EXISTS 'tci_app_user'@'127.0.0.1' 
  IDENTIFIED BY 'TCI_Secure_App_Pass_2026!';

CREATE USER IF NOT EXISTS 'tci_app_user'@'%' 
  IDENTIFIED BY 'TCI_Secure_App_Pass_2026!';

-- 3. Grant Least-Privilege DML Permissions (SELECT, INSERT, UPDATE, DELETE)
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE 
  ON `u738606952_theconclusive`.* 
  TO 'tci_app_user'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE 
  ON `u738606952_theconclusive`.* 
  TO 'tci_app_user'@'127.0.0.1';

GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE 
  ON `u738606952_theconclusive`.* 
  TO 'tci_app_user'@'%';

GRANT ALL PRIVILEGES 
  ON `u738606952_theconclusive`.* 
  TO 'u738606952_theconclusive'@'localhost';

GRANT ALL PRIVILEGES 
  ON `u738606952_theconclusive`.* 
  TO 'u738606952_theconclusive'@'127.0.0.1';

-- 4. Audit Log Table Immutability Safeguards
-- Note: Immutability of the `audit_logs` table (preventing UPDATE and DELETE) is
-- enforced at the database engine level via BEFORE UPDATE and BEFORE DELETE triggers
-- (`trg_audit_logs_prevent_update` and `trg_audit_logs_prevent_delete`).
-- This ensures append-only guarantees even against compromised application sessions.

-- 5. Resource Limits against Denial of Service (DoS) and Brute-force Floods
ALTER USER 'tci_app_user'@'localhost' WITH
  MAX_QUERIES_PER_HOUR 0
  MAX_UPDATES_PER_HOUR 0
  MAX_CONNECTIONS_PER_HOUR 0
  MAX_USER_CONNECTIONS 150;

ALTER USER 'tci_app_user'@'127.0.0.1' WITH
  MAX_USER_CONNECTIONS 150;

ALTER USER 'tci_app_user'@'%' WITH
  MAX_USER_CONNECTIONS 150;

-- 6. Apply Grants Immediately
FLUSH PRIVILEGES;

-- ==============================================================================
-- 7. Verification Query
-- Run this query to audit effective grants for the application user:
-- SHOW GRANTS FOR 'tci_app_user'@'localhost';
-- ==============================================================================
