<?php
// fileName: ContactController.php
require_once __DIR__ . '/../models/Contact.php';
require_once __DIR__ . '/../includes/response.php';
require_once __DIR__ . '/../includes/auth.php'; // For authenticateApiRequest

class ContactController {
    private $contactModel;

    public function __construct($db) {
        $this->contactModel = new Contact($db);
    }

    public function getAll() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $contacts = $this->contactModel->getAll()->fetchAll(PDO::FETCH_ASSOC);
        sendJsonResponse($contacts);
    }

    public function create() {
        // This endpoint is typically public as it's for users submitting contact forms
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
            sendErrorResponse('Missing required contact form data.', 400);
        }

        if ($this->contactModel->create($data)) {
            sendJsonResponse(['message' => 'Contact message sent successfully.'], 201);
        } else {
            sendErrorResponse('Failed to send contact message.', 500);
        }
    }

    public function delete($id) {
        error_log("ContactController::delete method WAS ENTERED for ID: " . $id); // Added logging
        if (!authenticateApiRequest()) {
            error_log("ContactController::delete - Unauthorized request."); // Added logging
            sendErrorResponse('Unauthorized.', 401);
            return;
        }
        if ($this->contactModel->delete($id)) {
            error_log("ContactController::delete - Contact deleted successfully via model."); // Added logging
            sendJsonResponse(['message' => 'Contact message deleted successfully.']);
        } else {
            error_log("ContactController::delete - Failed to delete contact message via model."); // Added logging
            sendErrorResponse('Failed to delete contact message.', 500);
        }
    }
}
