<?php
class Committee {
    private $conn;
    private $table = "committees";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($category = null) {
        $sql = "SELECT * FROM $this->table";
        if ($category) {
            $sql .= " WHERE category = :category";
        }
        $sql .= " ORDER BY id DESC";
        
        $stmt = $this->conn->prepare($sql);
        if ($category) {
            $stmt->bindParam(':category', $category);
        }
        $stmt->execute();
        return $stmt;
    }

    public function getPredefinedCategories() {
        return [
            'Honorary Committee',
            'Organizing Committee',
            'Steering Committee',
            'Special Issues Committee',
            'International Committee',
            'Keynote Committee',
            'Technical Committee',
            'Financial Committee',
            'Junior Committee',
            'Web Team'
        ];
    }

    public function get($id) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        if (!in_array($data['category'], $this->getPredefinedCategories())) {
            throw new InvalidArgumentException("Invalid committee category");
        }
        
        $stmt = $this->conn->prepare("INSERT INTO $this->table (name, role, description, category)
                                    VALUES (:name, :role, :description, :category)");
        return $stmt->execute($data);
    }

    public function update($id, $data) {
        if (!in_array($data['category'], $this->getPredefinedCategories())) {
            throw new InvalidArgumentException("Invalid committee category");
        }
        
        $data['id'] = $id;
        $stmt = $this->conn->prepare("UPDATE $this->table SET 
                                    name=:name, 
                                    role=:role, 
                                    description=:description,
                                    category=:category 
                                    WHERE id=:id");
        return $stmt->execute($data);
    }
    
    public function getCategories() {
        $stmt = $this->conn->prepare("SELECT DISTINCT category FROM $this->table ORDER BY category");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>