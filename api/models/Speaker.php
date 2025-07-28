<?php
class Speaker {
    private $conn;
    private $table = "speakers";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table ORDER BY id DESC");
        $stmt->execute();
        return $stmt;
    }

    public function get($id) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        // Ensure all fields are correctly bound in the INSERT statement
        $stmt = $this->conn->prepare("INSERT INTO $this->table (name, title, institution, bio, image)
                                      VALUES (:name, :title, :institution, :bio, :image)");
        // Execute with the associative array directly
        return $stmt->execute([
            'name' => $data['name'],
            'title' => $data['title'],
            'institution' => $data['institution'],
            'bio' => $data['bio'],
            'image' => $data['image'] // Ensure 'image' is explicitly included here
        ]);
    }

    public function update($id, $data) {
        // Ensure all fields are correctly bound in the UPDATE statement
        $stmt = $this->conn->prepare("UPDATE $this->table
            SET name=:name, title=:title, institution=:institution, bio=:bio, image=:image
            WHERE id=:id");
        // Execute with the associative array directly
        return $stmt->execute([
            'name' => $data['name'],
            'title' => $data['title'],
            'institution' => $data['institution'],
            'bio' => $data['bio'],
            'image' => $data['image'], // Ensure 'image' is explicitly included here
            'id' => $id // The ID for the WHERE clause
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>
