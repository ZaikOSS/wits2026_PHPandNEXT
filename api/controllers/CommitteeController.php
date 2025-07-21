<?php
require_once __DIR__ . '/../models/Committee.php';
require_once __DIR__ . '/../includes/response.php';
require_once __DIR__ . '/../includes/auth.php'; // For authenticateApiRequest

class CommitteeController {
    private $committeeModel;

    public function __construct($db) {
        $this->committeeModel = new Committee($db);
    }

    public function getAll() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $category = $_GET['category'] ?? null;
        $committees = $this->committeeModel->getAll($category)->fetchAll(PDO::FETCH_ASSOC);
        sendJsonResponse($committees);
    }

    public function get($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $committee = $this->committeeModel->get($id);
        if ($committee) {
            sendJsonResponse($committee);
        } else {
            sendErrorResponse('Committee member not found.', 404);
        }
    }

    public function create() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name']) || empty($data['role']) || empty($data['description']) || empty($data['category'])) {
            sendErrorResponse('Missing required committee member data.', 400);
        }

        try {
            if ($this->committeeModel->create($data)) {
                sendJsonResponse(['message' => 'Committee member created successfully.'], 201);
            } else {
                sendErrorResponse('Failed to create committee member.', 500);
            }
        } catch (InvalidArgumentException $e) {
            sendErrorResponse($e->getMessage(), 400);
        }
    }

    public function update($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name']) || empty($data['role']) || empty($data['description']) || empty($data['category'])) {
            sendErrorResponse('Missing required committee member data for update.', 400);
        }

        try {
            if ($this->committeeModel->update($id, $data)) {
                sendJsonResponse(['message' => 'Committee member updated successfully.']);
            } else {
                sendErrorResponse('Failed to update committee member.', 500);
            }
        } catch (InvalidArgumentException $e) {
            sendErrorResponse($e->getMessage(), 400);
        }
    }

    public function delete($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        if ($this->committeeModel->delete($id)) {
            sendJsonResponse(['message' => 'Committee member deleted successfully.']);
        } else {
            sendErrorResponse('Failed to delete committee member.', 500);
        }
    }

    public function getCategories() {
        // This endpoint could be public or require authentication depending on use case
        // if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $categories = $this->committeeModel->getPredefinedCategories(); // Or get dynamically from DB
        sendJsonResponse($categories);
    }
}
?>