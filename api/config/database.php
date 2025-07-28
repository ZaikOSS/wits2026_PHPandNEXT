<?php
class Database {
    private $host = "localhost";
    private $db_name = "sciencec_wits2026";
    private $username = "sciencec_stage_wits2026";
    private $password = "sciencec_stage_wits2026";
    public $conn;

    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>