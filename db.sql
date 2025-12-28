-- AARGA Policy Tracker (MySQL)
-- Import this in phpMyAdmin or mysql client

CREATE DATABASE IF NOT EXISTS aarga_policy_tracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aarga_policy_tracker;

CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(32) NOT NULL,
  name VARCHAR(150) NOT NULL,
  dob DATE NULL,
  mobile VARCHAR(32) NULL,
  email VARCHAR(190) NULL,
  address TEXT NULL,
  pan VARCHAR(32) NULL,
  smk VARCHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_customers_name (name),
  KEY idx_customers_mobile (mobile),
  KEY idx_customers_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS policies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id VARCHAR(32) NOT NULL,
  policy_uid VARCHAR(64) NOT NULL,
  type VARCHAR(50) NOT NULL,
  policy_id VARCHAR(80) NULL,
  company_name VARCHAR(150) NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_policy_uid_per_customer (customer_id, policy_uid),
  KEY idx_policies_customer (customer_id),
  KEY idx_policies_end_date (end_date),
  CONSTRAINT fk_policies_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
