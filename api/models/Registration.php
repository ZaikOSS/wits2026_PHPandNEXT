<?php
// fileName: Registration.php
class Registration {
    private $conn;
    private $table = "registrations";

    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function create($data) {
        $stmt = $this->conn->prepare("
            INSERT INTO $this->table
            (title, civility, last_name, first_name, organization, address, postal_code, city, country, email, phone, paper_id, receipt_file)
            VALUES
            (:title, :civility, :last_name, :first_name, :organization, :address, :postal_code, :city, :country, :email, :phone, :paper_id, :receipt_file)
        ");
        return $stmt->execute($data);
    }

    public function getAll() {
        return $this->conn->query("SELECT * FROM $this->table ORDER BY created_at DESC");
    }

    public function getPendingRegistrations() {
        return $this->conn->query("SELECT * FROM $this->table WHERE status = 'pending' ORDER BY created_at DESC");
    }

    public function getPendingCount() {
        return $this->conn->query("SELECT COUNT(*) FROM $this->table WHERE status = 'pending'")->fetchColumn();
    }

    public function updateStatus($id, $status) {
        $stmt = $this->conn->prepare("UPDATE $this->table SET status = ? WHERE id = ?");
        return $stmt->execute([$status, $id]);
    }

    public function delete($id) {
        // First, get the file path from the database
        $stmt = $this->conn->prepare("SELECT receipt_file FROM $this->table WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row && !empty($row['receipt_file'])) {
            // Corrected path: __DIR__ is in 'api/models/'
            // '/../../' goes up two directories to 'witsReact/'
            // Then append the relative path stored in the database (e.g., 'uploads/filename.pdf')
            $filePath = __DIR__ . '/../../' . $row['receipt_file']; 
            
            error_log("Registration::delete - Attempting to delete file: " . $filePath); // Add logging

            if (file_exists($filePath)) {
                if (unlink($filePath)) { // delete the file
                    error_log("Registration::delete - Successfully deleted file: " . $filePath);
                } else {
                    error_log("Registration::delete - Failed to unlink file: " . $filePath . ". Check permissions.");
                }
            } else {
                error_log("Registration::delete - File not found at path: " . $filePath);
            }
        }

        // Now delete the row from the database
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = ?");
        if ($stmt->execute([$id])) {
            error_log("Registration::delete - Successfully deleted registration record for ID: " . $id);
            return true;
        } else {
            error_log("Registration::delete - Failed to delete registration record for ID: " . $id);
            return false;
        }
    }
}
