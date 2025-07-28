<?php
// fileName: SpeakerController.php
require_once __DIR__ . '/../models/Speaker.php';
require_once __DIR__ . '/../includes/response.php';
require_once __DIR__ . '/../includes/auth.php'; // For authenticateApiRequest

class SpeakerController {
    private $speakerModel;

    public function __construct($db) {
        $this->speakerModel = new Speaker($db);
    }

    public function getAll() {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $speakers = $this->speakerModel->getAll()->fetchAll(PDO::FETCH_ASSOC);
        sendJsonResponse($speakers);
    }

    public function get($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $speaker = $this->speakerModel->get($id);
        if ($speaker) {
            sendJsonResponse($speaker);
        } else {
            sendErrorResponse('Speaker not found.', 404);
        }
    }

    public function create() {
        error_log("SpeakerController::create method WAS ENTERED!"); 
        
        // Check for raw input first, as file uploads (multipart/form-data) don't populate php://input
        // For JSON data, file_get_contents('php://input') is used.
        // For multipart/form-data (file uploads), $_POST and $_FILES are used.
        // Since we are sending JSON data *after* file upload, this is still relevant.
        $rawInput = file_get_contents('php://input');
        error_log("SpeakerController::create - RAW INPUT (very early): " . $rawInput);

        if (empty($rawInput)) {
            error_log("SpeakerController::create - RAW INPUT IS EMPTY. This usually means POST data was not sent or was discarded by PHP (e.g., post_max_size).");
            sendErrorResponse('No data received in request body. Ensure Content-Type is application/json and data is sent.', 400);
            return;
        }

        if (!authenticateApiRequest()) { 
            error_log("SpeakerController::create - Unauthorized request.");
            sendErrorResponse('Unauthorized.', 401); 
            return; 
        }
        
        $data = json_decode($rawInput, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $jsonErrorMsg = json_last_error_msg();
            error_log("SpeakerController::create - JSON Decode Error: " . $jsonErrorMsg);
            error_log("SpeakerController::create - Raw input causing JSON error: " . $rawInput); 
            sendErrorResponse('Invalid JSON data received: ' . $jsonErrorMsg, 400);
            return; 
        }

        if (!is_array($data)) {
            error_log("SpeakerController::create - Decoded data is not an array. Raw input: " . $rawInput);
            sendErrorResponse('Invalid data format. Expected JSON object.', 400);
            return;
        }

        // Handle 'image' field: Ensure it's null if empty string or not set
        if (!isset($data['image']) || (isset($data['image']) && $data['image'] === '')) {
            $data['image'] = null;
            error_log("SpeakerController::create - 'image' was empty string or missing, set to null.");
        } else {
            error_log("SpeakerController::create - 'image' field received: " . $data['image']);
        }

        error_log("SpeakerController::create - Decoded data (after image check): " . print_r($data, true));
        error_log("SpeakerController::create - Image field value from decoded data (after check): " . ($data['image'] ?? 'NOT SET AFTER CHECK'));

        if (empty($data['name']) || empty($data['title']) || empty(trim($data['institution'])) || empty($data['bio'])) {
            error_log("SpeakerController::create - Missing required fields.");
            sendErrorResponse('Missing required speaker data.', 400);
            return;
        }
        
        if ($this->speakerModel->create($data)) {
            error_log("SpeakerController::create - Speaker created successfully in DB.");
            sendJsonResponse(['message' => 'Speaker created successfully.'], 201);
        } else {
            error_log("SpeakerController::create - Failed to create speaker in DB. Check DB logs/constraints.");
            sendErrorResponse('Failed to create speaker.', 500);
        }
    }

    public function update($id) {
        error_log("SpeakerController::update method WAS ENTERED!");
        $rawInput = file_get_contents('php://input');
        error_log("SpeakerController::update - RAW INPUT (very early): " . $rawInput);

        if (empty($rawInput)) {
            error_log("SpeakerController::update - RAW INPUT IS EMPTY. Possible issue with Content-Type or PUT data not reaching PHP.");
            sendErrorResponse('No data received. Check request body and headers.', 400);
            return;
        }

        if (!authenticateApiRequest()) { 
            error_log("SpeakerController::update - Unauthorized request.");
            sendErrorResponse('Unauthorized.', 401); 
            return; 
        }
        $data = json_decode($rawInput, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $jsonErrorMsg = json_last_error_msg();
            error_log("SpeakerController::update - JSON Decode Error: " . $jsonErrorMsg);
            error_log("SpeakerController::update - Raw input causing error: " . $rawInput);
            sendErrorResponse('Invalid JSON data received: ' . $jsonErrorMsg, 400);
            return;
        }
        if (!is_array($data)) {
            error_log("SpeakerController::update - Decoded data is not an array. Raw input: " . $rawInput);
            sendErrorResponse('Invalid data format. Expected JSON object.', 400);
            return;
        }

        // Handle 'image' field: Ensure it's null if empty string or not set
        if (!isset($data['image']) || (isset($data['image']) && $data['image'] === '')) {
            $data['image'] = null;
            error_log("SpeakerController::update - 'image' was empty string or missing, set to null.");
        } else {
            error_log("SpeakerController::update - 'image' field received: " . $data['image']);
        }

        error_log("SpeakerController::update - Decoded data (after image check): " . print_r($data, true));
        error_log("SpeakerController::update - Image field value from decoded data (after check): " . ($data['image'] ?? 'NOT SET AFTER CHECK'));

        if (empty($data['name']) || empty($data['title']) || empty(trim($data['institution'])) || empty($data['bio'])) { 
            error_log("SpeakerController::update - Missing required fields.");
            sendErrorResponse('Missing required speaker data for update.', 400);
            return;
        }

        if ($this->speakerModel->update($id, $data)) {
            error_log("SpeakerController::update - Speaker updated successfully in DB.");
            sendJsonResponse(['message' => 'Speaker updated successfully.']);
        } else {
            error_log("SpeakerController::update - Failed to update speaker in DB.");
            sendErrorResponse('Failed to update speaker.', 500);
        }
    }

    public function delete($id) {
        if (!authenticateApiRequest()) { sendErrorResponse('Unauthorized.', 401); }
        $speaker = $this->speakerModel->get($id);
        if ($speaker && !empty($speaker['image'])) {
            $imagePath = __DIR__ . '/../../' . $speaker['image']; 
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        if ($this->speakerModel->delete($id)) {
            sendJsonResponse(['message' => 'Speaker deleted successfully.']);
        } else {
            sendErrorResponse('Failed to delete speaker.', 500);
        }
    }
}
