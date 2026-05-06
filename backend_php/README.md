<div align="center">
  <img src="https://img.icons8.com/color/96/000000/php.png" alt="PHP Logo" width="80" />
  <h1>Backend PHP Exercises</h1>
  <p><strong>A collection of backend PHP scripts for database interactions and RESTful operations</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Language-PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
    <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>
</div>

---

## 📌 Introduction

This directory contains foundational backend scripts written in PHP to demonstrate core server-side functionalities. It serves as a practice ground for establishing database connections, performing CRUD (Create, Read, Update, Delete) operations, and bridging the gap between HTML frontend forms and backend logic.

## 📂 Directory Structure

The `backend_php` folder is organized into sub-projects representing different learning phases and use cases:

- **[`crud_practice1/`](./crud_practice1)**: Contains standalone PHP scripts demonstrating the implementation of raw CRUD operations for a product management context.
- **[`php_html/`](./php_html)**: Demonstrates the integration between HTML frontend views (e.g., `add_patient.html`) and PHP backend logic, showing how form data is submitted and processed by the server.

---

## 🛠️ Core Concepts Covered

- **Database Connectivity**: Utilizing `mysqli` to establish secure connections with a local MySQL instance.
- **Data Insertion**: Processing `POST` requests and executing `INSERT` queries securely.
- **Data Retrieval**: Using `GET` queries to fetch records and display them in structured formats.
- **Data Modification**: Updating existing database entries through form-based inputs.
- **Data Deletion**: Removing records safely from the database using parameterized endpoints.

---

## 🚀 Setup & Execution

To run these PHP scripts locally, you need a local server environment with PHP and MySQL support, such as **XAMPP**, **WAMP**, or **MAMP**.

1. **Install Local Server**: Download and install [XAMPP](https://www.apachefriends.org/index.html) (or an equivalent).
2. **Start Services**: Open the XAMPP Control Panel and start the **Apache** and **MySQL** modules.
3. **Configure Database**:
   - Navigate to `http://localhost/phpmyadmin/`.
   - Create a new database as required by the scripts (typically check `db.php` for database names).
   - Create the necessary tables (e.g., `products`, `patients`) with appropriate schemas.
4. **Deploy Code**: 
   - Move or clone this `backend_php` folder into your server's root directory (`htdocs` for XAMPP).
5. **Run in Browser**: 
   - Access the scripts via `http://localhost/backend_php/crud_practice1/` or `http://localhost/backend_php/php_html/`.
