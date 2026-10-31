# Aadhunik Jana Saving & Credit Co-operative Ltd.
**Nepali:** आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड  
**Location:** Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal  
**Type:** Financial Cooperative Institution (बचत तथा ऋण सहकारी संस्था)  
**DoC Registration No:** 1248/065/066  
**PAN:** 302847195  

---

## 1. System Overview

This application provides the official responsive bilingual website, online preliminary loan inquiry flow, interactive member self-service portal, comprehensive administrative Content Management System (CMS), and downloadable forms for **Aadhunik Jana Saving & Credit Co-operative Ltd.**

### Architecture & Tech Stack:
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Font Awesome, Chart.js, Google Fonts (*Noto Sans Devanagari* for authentic Nepali rendering, *Plus Jakarta Sans* for modern English financial typography).
- **Backend:** Core PHP 8.4 (Object-Oriented Architecture), PDO database access, CSRF token verification, and session timeout management.
- **Database:** MySQL 8.0+ / MariaDB 10.5+ with `utf8mb4` character set.
- **Web Server:** Apache (with `mod_rewrite` clean SEO URLs).
- **Target Environments:** Local XAMPP and Standard Production cPanel.

---

## 2. Local Setup on XAMPP (Windows / Mac / Linux)

1. **Prerequisites:** Install XAMPP with PHP 8.2 or 8.4 and MySQL.
2. **Directory Placement:** Extract or copy project files into your XAMPP web root:
   ```
   C:\xampp\htdocs\aadhunik-jana\
   ```
3. **Start Services:** Start **Apache** and **MySQL** in the XAMPP Control Panel.
4. **Create Database:**
   - Open `http://localhost/phpmyadmin` in your browser.
   - Click **New** and name the database: `aadhunik_cooperative`
   - Set Collation: `utf8mb4_unicode_ci`
5. **Import Schema & Seed Data:**
   - Select `aadhunik_cooperative`.
   - Go to the **Import** tab.
   - Select `database/install.sql` from the project folder and click **Import**.
6. **Access Application:**
   - Public Website: `http://localhost/aadhunik-jana/`
   - Member Portal: `http://localhost/aadhunik-jana/member/`
   - Admin CMS: `http://localhost/aadhunik-jana/admin/`
7. **Default Admin Login Credentials:**
   - **Username:** `admin`
   - **Password:** `admin123`

---

## 3. Production Deployment on cPanel Hosting

1. Log into your web hosting cPanel account.
2. In the **Databases** section, open **MySQL Database Wizard**:
   - Create a database, e.g., `cpuser_aadhunik`
   - Create a database user with a secure password and grant **ALL PRIVILEGES**.
3. Open **phpMyAdmin** in cPanel, select the new database, and **Import** `database/install.sql`.
4. In **File Manager**, open `public_html` and upload the project files.
5. In `config/database.php`, configure your live database credentials or configure environment variables:
   ```php
   $host = 'localhost';
   $dbName = 'cpuser_aadhunik';
   $username = 'cpuser_dbuser';
   $password = 'YourStrongProductionPassword!';
   ```
6. Ensure Apache `.htaccess` is present and active in the web root.
7. Verify permissions:
   - Directories: `0755`
   - PHP and Asset files: `0644`
   - `.htaccess`: `0644`
8. Verify HTTPS SSL certificate installation in cPanel.

---

## 4. Security & Compliance Highlights

- **SQL Injection Prevention:** 100% PDO prepared statements throughout all queries.
- **Cross-Site Scripting (XSS):** Context-aware escaping via `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.
- **Cross-Site Request Forgery (CSRF):** Cryptographic token generated per session.
- **Member Financial Privacy:** Consistent with cooperative regulations, the public portal does not expose internal live banking ledger balances without physical teller desk verification.
- **Audit Logging:** Administrative actions, logins, status changes, and publications are permanently logged to the `activity_logs` table with timestamp and IP address.
