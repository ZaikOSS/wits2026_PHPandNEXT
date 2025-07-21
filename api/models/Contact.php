<?php
// fileName: Contact.php
class Contact {
    private $conn;
    private $table = "contacts";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        $stmt = $this->conn->prepare("
            INSERT INTO $this->table (name, email, subject, message)
            VALUES (:name, :email, :subject, :message)
        ");
        return $stmt->execute($data);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table ORDER BY created_at DESC");
    }

    public function delete($id) {
        error_log("Contact::delete - Attempting to delete contact with ID: " . $id); // Added logging
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = ?");
        if ($stmt->execute([$id])) {
            error_log("Contact::delete - Successfully deleted contact record for ID: " . $id); // Added logging
            return true;
        } else {
            error_log("Contact::delete - Failed to delete contact record for ID: " . $id . ". PDO Error: " . print_r($stmt->errorInfo(), true)); // Added detailed error logging
            return false;
        }
    }
}
