<?php
require_once __DIR__ . '/../models/Registration.php';
require_once __DIR__ . '/../includes/response.php';
require_once __DIR__ . '/../includes/auth.php'; // For authenticateApiRequest

class RegistrationController {
    private $registrationModel;

    public function __construct($db) {
        $this->registrationModel = new Registration($db);
    }

    public function getAll() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $registrations = $this->registrationModel->getAll()->fetchAll(PDO::FETCH_ASSOC);
        sendJsonResponse($registrations);
    }

    public function getPending() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $pendingRegistrations = $this->registrationModel->getPendingRegistrations()->fetchAll(PDO::FETCH_ASSOC);
        sendJsonResponse($pendingRegistrations);
    }

    public function create() {
        // This endpoint is typically public for users to register
        $data = json_decode(file_get_contents('php://input'), true);

        // Basic validation
        $required_fields = ['title', 'civility', 'last_name', 'first_name', 'organization', 'address', 'postal_code', 'city', 'country', 'email', 'phone'];
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                sendErrorResponse("Missing required field: $field", 400);
            }
        }
        
        // For 'receipt_file', this assumes the file is uploaded to a separate endpoint first
        // and its path is included in the JSON data.
        $data['receipt_file'] = $data['receipt_file'] ?? null;
        $data['paper_id'] = $data['paper_id'] ?? null; // Optional field

        if ($this->registrationModel->create($data)) {
            sendJsonResponse(['message' => 'Registration created successfully.'], 201);
        } else {
            sendErrorResponse('Failed to create registration.', 500);
        }
    }

    public function updateStatus($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $data = json_decode(file_get_contents('php://input'), true);

        $status = $data['status'] ?? null;
        
        // --- START OF RECOMMENDED FIX ---
        // Validate the incoming status against the allowed ENUM values
        $allowed_statuses = ['pending', 'approved', 'rejected']; // These must exactly match your database ENUM values
        if (empty($status) || !in_array($status, $allowed_statuses, true)) {
            sendErrorResponse('Invalid or missing status provided. Allowed values are: ' . implode(', ', $allowed_statuses), 400);
            return; // Stop execution if validation fails
        }
        // --- END OF RECOMMENDED FIX ---

        if ($this->registrationModel->updateStatus($id, $status)) {
            sendJsonResponse(['message' => 'Registration status updated successfully.']);
        } else {
            sendErrorResponse('Failed to update registration status.', 500);
        }
    }

    public function delete($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        if ($this->registrationModel->delete($id)) {
            sendJsonResponse(['message' => 'Registration deleted successfully.']);
        } else {
            sendErrorResponse('Failed to delete registration.', 500);
        }
    }
}
?>