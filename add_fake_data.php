<?php
// fileName: add_fake_data.php

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include necessary files
require_once __DIR__ . '/api/config/database.php';
require_once __DIR__ . '/api/models/Registration.php';
require_once __DIR__ . '/api/models/Contact.php';

echo "Starting fake data insertion...\n\n";

// Database connection
$database = new Database();
$db = $database->connect();

if ($db === null) {
    echo "Error: Could not connect to the database. Please check your api/config/database.php file.\n";
    exit();
}

$registrationModel = new Registration($db);
$contactModel = new Contact($db);

// --- Fake Registration Data ---
$fake_registrations = [
    [
        'title' => 'Dr.',
        'civility' => 'Mr.',
        'last_name' => 'Doe',
        'first_name' => 'John',
        'organization' => 'Tech Solutions Inc.',
        'address' => '123 Main St',
        'postal_code' => '10001',
        'city' => 'New York',
        'country' => 'USA',
        'email' => 'john.doe@example.com',
        'phone' => '+12125550100',
        'paper_id' => 'WITS2026-001,WITS2026-002',
        'receipt_file' => null, // No receipt for fake data
        'status' => 'pending'
    ],
    [
        'title' => 'Ms.',
        'civility' => 'Ms.',
        'last_name' => 'Smith',
        'first_name' => 'Jane',
        'organization' => 'Global Innovations',
        'address' => '456 Oak Ave',
        'postal_code' => '90210',
        'city' => 'Beverly Hills',
        'country' => 'USA',
        'email' => 'jane.smith@example.com',
        'phone' => '+13105550101',
        'paper_id' => 'WITS2026-003',
        'receipt_file' => null,
        'status' => 'approved'
    ],
    [
        'title' => 'Prof.',
        'civility' => 'Dr.',
        'last_name' => 'Williams',
        'first_name' => 'Robert',
        'organization' => 'University of Research',
        'address' => '789 Pine Ln',
        'postal_code' => 'SW1A 0AA',
        'city' => 'London',
        'country' => 'UK',
        'email' => 'robert.williams@example.com',
        'phone' => '+442079460100',
        'paper_id' => null,
        'receipt_file' => null,
        'status' => 'pending'
    ],
    [
        'title' => 'Eng.',
        'civility' => 'Mr.',
        'last_name' => 'Garcia',
        'first_name' => 'Maria',
        'organization' => 'Engineering Solutions',
        'address' => '10 Downing St',
        'postal_code' => 'SW1A 2AA',
        'city' => 'London',
        'country' => 'UK',
        'email' => 'maria.garcia@example.com',
        'phone' => '+442079460101',
        'paper_id' => 'WITS2026-004',
        'receipt_file' => null,
        'status' => 'rejected'
    ],
    [
        'title' => 'Mr.',
        'civility' => 'Mr.',
        'last_name' => 'Brown',
        'first_name' => 'Charlie',
        'organization' => 'Innovate Co.',
        'address' => '101 Tech Rd',
        'postal_code' => '94043',
        'city' => 'Mountain View',
        'country' => 'USA',
        'email' => 'charlie.brown@example.com',
        'phone' => '+16505550100',
        'paper_id' => null,
        'receipt_file' => null,
        'status' => 'pending'
    ],
];

echo "--- Inserting Fake Registrations ---\n";
$reg_success_count = 0;
$reg_fail_count = 0;

foreach ($fake_registrations as $reg_data) {
    echo "Attempting to add registration for: " . $reg_data['first_name'] . " " . $reg_data['last_name'] . "...\n";
    try {
        // Check if a registration with the same email already exists to prevent duplicates
        $stmt = $db->prepare("SELECT COUNT(*) FROM registrations WHERE email = :email");
        $stmt->execute(['email' => $reg_data['email']]);
        if ($stmt->fetchColumn() > 0) {
            echo "Skipping: Registration for '{$reg_data['email']}' already exists.\n";
            continue;
        }

        if ($registrationModel->create($reg_data)) {
            echo "Successfully added registration for: " . $reg_data['first_name'] . " " . $reg_data['last_name'] . "\n";
            $reg_success_count++;
        } else {
            echo "Failed to add registration for: " . $reg_data['first_name'] . " " . $reg_data['last_name'] . "\n";
            $reg_fail_count++;
        }
    } catch (PDOException $e) {
        echo "Database error for registration {$reg_data['email']}: " . $e->getMessage() . "\n";
        $reg_fail_count++;
    } catch (Exception $e) {
        echo "An unexpected error occurred for registration {$reg_data['email']}: " . $e->getMessage() . "\n";
        $reg_fail_count++;
    }
}
echo "Registrations Added: " . $reg_success_count . ", Failed: " . $reg_fail_count . "\n\n";


// --- Fake Contact Data ---
$fake_contacts = [
    [
        'name' => 'Alice Wonderland',
        'email' => 'alice@example.com',
        'subject' => 'Inquiry about conference schedule',
        'message' => 'Hello, I am writing to inquire about the detailed schedule for the WITS 2026 conference. Could you please provide more information on the session timings and breaks?'
    ],
    [
        'name' => 'Bob The Builder',
        'email' => 'bob@example.com',
        'subject' => 'Question about paper submission',
        'message' => 'Hi team, I have a question regarding the paper submission guidelines. Specifically, I\'m unclear about the page limit for full papers. Can you clarify this for me?'
    ],
    [
        'name' => 'Charlie Chaplin',
        'email' => 'charlie@example.com',
        'subject' => 'Feedback on website design',
        'message' => 'Just wanted to say that your website looks great! Very clean and easy to navigate. Keep up the good work!'
    ],
    [
        'name' => 'Diana Prince',
        'email' => 'diana@example.com',
        'subject' => 'Sponsorship opportunities',
        'message' => 'Our company is interested in exploring sponsorship opportunities for WITS 2026. Could you please send us a brochure or connect us with the relevant department?'
    ],
    [
        'name' => 'Eve Harrington',
        'email' => 'eve@example.com',
        'subject' => 'Urgent: Password Reset Issue',
        'message' => 'I am unable to reset my password on the registration portal. I have tried multiple times, but I am not receiving the reset email. Please help!'
    ],
];

echo "--- Inserting Fake Contacts ---\n";
$contact_success_count = 0;
$contact_fail_count = 0;

foreach ($fake_contacts as $contact_data) {
    echo "Attempting to add contact from: " . $contact_data['name'] . "...\n";
    try {
        // Check if a contact with the same email and subject already exists to prevent duplicates
        $stmt = $db->prepare("SELECT COUNT(*) FROM contacts WHERE email = :email AND subject = :subject");
        $stmt->execute([
            'email' => $contact_data['email'],
            'subject' => $contact_data['subject']
        ]);
        if ($stmt->fetchColumn() > 0) {
            echo "Skipping: Contact from '{$contact_data['email']}' with subject '{$contact_data['subject']}' already exists.\n";
            continue;
        }

        if ($contactModel->create($contact_data)) {
            echo "Successfully added contact from: " . $contact_data['name'] . "\n";
            $contact_success_count++;
        } else {
            echo "Failed to add contact from: " . $contact_data['name'] . "\n";
            $contact_fail_count++;
        }
    } catch (PDOException $e) {
        echo "Database error for contact {$contact_data['email']}: " . $e->getMessage() . "\n";
        $contact_fail_count++;
    } catch (Exception $e) {
        echo "An unexpected error occurred for contact {$contact_data['email']}: " . $e->getMessage() . "\n";
        $contact_fail_count++;
    }
}
echo "Contacts Added: " . $contact_success_count . ", Failed: " . $contact_fail_count . "\n\n";

echo "<h2>Fake Data Insertion Completed!</h2>";
echo "<p>Total new registrations inserted: $reg_success_count</p>";
echo "<p>Total new contacts inserted: $contact_success_count</p>";

// Add a button to easily navigate back to the admin dashboard (assuming it's at /admin)
echo '<a href="/witsReact/admin" style="display: inline-block; margin-top: 20px; padding: 10px 15px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Return to Admin Dashboard</a>';

// Close the database connection
$db = null;
?>
