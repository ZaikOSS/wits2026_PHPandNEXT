<?php
// This auth.php is typically for traditional PHP page authentication (session-based)
// It's kept for consistency if other non-API PHP pages still use it.
session_start();

function isAuthenticated() {
    return isset($_SESSION['admin_id']);
}

function requireAuth() {
    if (!isAuthenticated()) {
        header("Location: login.php");
        exit();
    }
}

// For API, we use token/API key authentication.
function authenticateApiRequest() {
    // Implement API key or token validation here
    // For demonstration, let's use a simple header check
    $headers = getallheaders();
    $api_key = $headers['X-API-Key'] ?? '';
    
    // Use the strong API_KEY defined previously
    // This API_KEY should be stored securely, e.g., in an environment variable or config file outside web root.
    // For this example, we'll assume it's defined elsewhere or hardcoded for now (but not recommended for production).
    
    // As per previous instruction, API_KEY is 'b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6'
    if ($api_key === 'b0b4e0d7c9f8a1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6') {
        return true;
    }
    return false;
}
?>