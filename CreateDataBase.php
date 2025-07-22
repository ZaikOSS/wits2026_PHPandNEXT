<?php
// fileName: create_database.php

// Include the database configuration
require_once 'api/config/database.php';

// Create a new Database object
$database = new Database();
$conn = null; // Initialize connection to null

try {
    // Attempt to connect to MySQL server without specifying a database first
    // This is necessary to create the database itself if it doesn't exist
    $host = "localhost"; // Get from your database.php or hardcode if it's always localhost
    $username = "root";  // Get from your database.php
    $password = "";      // Get from your database.php

    $conn = new PDO("mysql:host=$host", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Connected to MySQL server successfully.\n";

    // 1. Create the database if it doesn't exist
    $db_name = "wits2026"; // Get from your database.php
    $conn->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "Database `$db_name` checked/created successfully.\n";

    // Now connect to the newly created/existing database
    $conn = $database->connect();
    if ($conn === null) {
        die("Failed to connect to the database '$db_name'. Check your database.php settings.\n");
    }
    echo "Connected to database `$db_name` successfully.\n";

    // 2. Create tables

    // Admins table (for AuthController)
    $conn->exec("
        CREATE TABLE IF NOT EXISTS `admins` (
            `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(255) NOT NULL UNIQUE,
            `password` VARCHAR(255) NOT NULL, -- Store SHA256 hash or ideally use password_hash()
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Table `admins` checked/created successfully.\n";

    // Optional: Insert a default admin user (for testing, remember to change password)
    // The password 'adminpass' is hashed with SHA256. In production, use password_hash().
    $admin_username = 'admin';
    $admin_password_hash = hash('sha256', 'admin'); // Replace 'adminpass' with a strong password

    $stmt = $conn->prepare("SELECT COUNT(*) FROM `admins` WHERE username = :username");
    $stmt->execute(['username' => $admin_username]);
    if ($stmt->fetchColumn() == 0) {
        $stmt = $conn->prepare("INSERT INTO `admins` (username, password) VALUES (:username, :password)");
        $stmt->execute([
            'username' => $admin_username,
            'password' => $admin_password_hash
        ]);
        echo "Default admin user 'admin' inserted. Password: 'adminpass' (SHA256 hashed).\n";
    } else {
        echo "Admin user 'admin' already exists.\n";
    }

    // Contacts table (for Contact.php)
    $conn->exec("
        CREATE TABLE IF NOT EXISTS `contacts` (
            `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `subject` VARCHAR(255) NOT NULL,
            `message` TEXT NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Table `contacts` checked/created successfully.\n";

    // Registrations table (for Registration.php)
    $conn->exec("
        CREATE TABLE IF NOT EXISTS `registrations` (
            `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `civility` VARCHAR(50) NOT NULL,
            `last_name` VARCHAR(255) NOT NULL,
            `first_name` VARCHAR(255) NOT NULL,
            `organization` VARCHAR(255) NOT NULL,
            `address` TEXT NOT NULL,
            `postal_code` VARCHAR(50) NOT NULL,
            `city` VARCHAR(255) NOT NULL,
            `country` VARCHAR(255) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(50) NOT NULL,
            `paper_id` VARCHAR(255) NULL, -- Can be NULL
            `receipt_file` VARCHAR(255) NULL, -- Path to uploaded file, can be NULL
            `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Table `registrations` checked/created successfully.\n";

    // Speakers table (for Speaker.php)
    $conn->exec("
        CREATE TABLE IF NOT EXISTS `speakers` (
            `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `institution` VARCHAR(255) NOT NULL,
            `bio` TEXT NOT NULL,
            `image` VARCHAR(255) NULL, -- Path to uploaded image, can be NULL
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Table `speakers` checked/created successfully.\n";

    // Committees table (for Committee.php)
    $conn->exec("
        CREATE TABLE IF NOT EXISTS `committees` (
            `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `role` VARCHAR(255) NOT NULL,
            `description` TEXT,
            `category` VARCHAR(255) NOT NULL, -- Will store categories like 'Honorary Committee', etc.
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Table `committees` checked/created successfully.\n";

    echo "\nDatabase and all tables are set up!";

} catch(PDOException $exception) {
    echo "Error: " . $exception->getMessage() . "\n";
} finally {
    // Close the connection
    $conn = null;
}
?>
