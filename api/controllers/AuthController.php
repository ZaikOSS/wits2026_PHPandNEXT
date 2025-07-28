<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/response.php';

class AuthController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login() {
        
        $data = json_decode(file_get_contents('php://input'), true);

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            sendErrorResponse('Username and password are required.', 400);
        }

        $stmt = $this->conn->prepare("SELECT * FROM admins WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && hash('sha256', $password) === $admin['password']) { // Use password_verify() in production!
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            // In a real API, you might generate and return a JWT token here.
            sendJsonResponse(['message' => 'Login successful.', 'admin_username' => $admin['username']]);
        } else {
            sendErrorResponse('Invalid credentials.', 401);
        }
    }

    public function logout() {
        
        session_unset();
        session_destroy();
        sendJsonResponse(['message' => 'Logout successful.']);
    }
}
?>