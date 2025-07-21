<?php
// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS Headers - Allow requests from your React frontend origin
header('Access-Control-Allow-Origin: *'); // Or 'http://localhost:3000' during development
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once 'config/database.php';
require_once 'includes/response.php';
require_once 'includes/auth.php';

require_once 'controllers/AuthController.php';
require_once 'controllers/SpeakerController.php';
require_once 'controllers/CommitteeController.php';
require_once 'controllers/ContactController.php';
require_once 'controllers/RegistrationController.php';
require_once 'controllers/UploadController.php'; // Ensure this is included

$database = new Database();
$db = $database->connect();

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = '/witsReact/api';
if (strpos($requestUri, $basePath) === 0) {
    $requestUri = substr($requestUri, strlen($basePath));
}

$requestParts = explode('/', trim($requestUri, '/'));

$resource = $requestParts[0] ?? '';
$id = $requestParts[1] ?? null;
$action = $requestParts[2] ?? null;

switch ($resource) {
    case 'auth':
        $controller = new AuthController($db);
        if ($id === 'login' && $method === 'POST') {
            $controller->login();
        } elseif ($id === 'logout' && $method === 'POST') {
            $controller->logout();
        } else {
            sendErrorResponse('Auth endpoint not found or method not allowed.', 404);
        }
        break;

    case 'speakers':
        $controller = new SpeakerController($db);
        if ($method === 'GET' && $id) {
            $controller->get($id);
        } elseif ($method === 'GET') {
            $controller->getAll();
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'PUT' && $id) {
            $controller->update($id);
        } elseif ($method === 'DELETE' && $id) {
            $controller->delete($id);
        } else {
            sendErrorResponse('Method not allowed for speakers.', 405);
        }
        break;

    case 'committees':
        $controller = new CommitteeController($db);
        if ($id === 'categories' && $method === 'GET') {
            $controller->getCategories();
        } elseif ($method === 'GET' && $id) {
            $controller->get($id);
        } elseif ($method === 'GET') {
            $controller->getAll();
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'PUT' && $id) {
            $controller->update($id);
        } elseif ($method === 'DELETE' && $id) {
            $controller->delete($id);
        } else {
            sendErrorResponse('Method not allowed for committees.', 405);
        }
        break;

    case 'contacts':
        $controller = new ContactController($db);
        if ($method === 'GET') {
            $controller->getAll();
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'DELETE' && $id) {
            $controller->delete($id);
        } else {
            sendErrorResponse('Method not allowed for contacts.', 405);
        }
        break;

    case 'registrations':
        $controller = new RegistrationController($db);
        if ($id === 'pending' && $method === 'GET') {
            $controller->getPending();
        } elseif ($method === 'GET') {
            $controller->getAll();
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($id && $action === 'status' && $method === 'PUT') {
            $controller->updateStatus($id);
        } elseif ($method === 'DELETE' && $id) {
            $controller->delete($id);
        } else {
            sendErrorResponse('Method not allowed for registrations.', 405);
        }
        break;
        
    case 'upload_image':
        if ($method === 'POST') {
            $uploadController = new UploadController();
            $uploadController->upload('image'); // Pass the expected file field name
        } else {
            sendErrorResponse('Method not allowed for image uploads.', 405);
        }
        break;

    // --- NEW CASE FOR RECEIPT UPLOAD ---
    case 'upload_receipt':
        if ($method === 'POST') {
            $uploadController = new UploadController();
            $uploadController->upload('receipt'); // Pass the expected file field name
        } else {
            sendErrorResponse('Method not allowed for receipt uploads.', 405);
        }
        break;

    default:
        sendErrorResponse('API endpoint not found.', 404);
        break;
}
?>
