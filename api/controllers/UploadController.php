<?php
// fileName: UploadController.php
require_once __DIR__ . '/../includes/response.php';
require_once __DIR__ . '/../includes/auth.php';

class UploadController {
    // Modify the upload method to accept the expected file field name
    public function upload($fileFieldName = 'image') {
        error_log("UploadController::upload method WAS ENTERED for field: " . $fileFieldName);

        if (!authenticateApiRequest()) {
            error_log("UploadController::upload - Unauthorized request.");
            sendErrorResponse('Unauthorized.', 401);
            return;
        }

        // Check if the specific file field exists and has no upload errors
        if (isset($_FILES[$fileFieldName]) && $_FILES[$fileFieldName]['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES[$fileFieldName];
            error_log("UploadController::upload - File received: " . print_r($file, true));

            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . "." . $ext;

            // Define the target directory relative to the web root
            // __DIR__ is D:\xampp\htdocs\witsReact\api\controllers\
            // '/../' goes up to D:\xampp\htdocs\witsReact\api\
            // '/../' again goes up to D:\xampp\htdocs\witsReact\
            // '/uploads/' then goes into D:\xampp\htdocs\witsReact\uploads\
            $target_directory = __DIR__ . '/../../uploads/';
            
            error_log("UploadController::upload - Target directory: " . $target_directory);

            // Ensure the uploads directory exists
            if (!is_dir($target_directory)) {
                error_log("UploadController::upload - Upload directory does not exist. Attempting to create: " . $target_directory);
                // Attempt to create the directory with appropriate permissions
                if (!mkdir($target_directory, 0775, true)) { // 0775 for group write, others read/execute
                    error_log("UploadController::upload - Failed to create upload directory. Check permissions.");
                    sendErrorResponse('Failed to create upload directory. Check permissions.', 500);
                    return;
                }
                error_log("UploadController::upload - Upload directory created successfully.");
            }

            $target_file = $target_directory . $filename;
            error_log("UploadController::upload - Target file path for saving: " . $target_file);

            if (move_uploaded_file($file['tmp_name'], $target_file)) {
                // The file_path returned should be relative to your web root (witsReact folder)
                // So, it should be 'uploads/filename.ext'
                $filePath = 'uploads/' . $filename; 
                error_log("UploadController::upload - File moved successfully. Returning path: " . $filePath);
                
                // Determine the key based on the fileFieldName
                if ($fileFieldName === 'image') {
                    sendJsonResponse(['message' => 'File uploaded successfully.', 'image_path' => $filePath]);
                } elseif ($fileFieldName === 'receipt') {
                    sendJsonResponse(['message' => 'File uploaded successfully.', 'file_path' => $filePath]);
                } else {
                    // Fallback for other file types if needed
                    sendJsonResponse(['message' => 'File uploaded successfully.', 'path' => $filePath]);
                }
            } else {
                // Provide more specific error messages for move_uploaded_file failure
                $errorMessage = 'Failed to move uploaded file. Check directory permissions or disk space.';
                error_log("UploadController::upload - " . $errorMessage . " Source: " . $file['tmp_name'] . " Destination: " . $target_file);
                sendErrorResponse($errorMessage, 500);
            }
        } else {
            // Provide more specific error messages based on $_FILES error code
            $errorMessage = 'No file uploaded or upload error occurred.';
            if (isset($_FILES[$fileFieldName]['error'])) {
                switch ($_FILES[$fileFieldName]['error']) {
                    case UPLOAD_ERR_INI_SIZE:
                    case UPLOAD_ERR_FORM_SIZE:
                        $errorMessage = 'Uploaded file exceeds maximum size allowed by PHP configuration.';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    case UPLOAD_ERR_PARTIAL:
                        $errorMessage = 'File was only partially uploaded.';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        $errorMessage = 'No file was uploaded. Ensure file input is correctly handled.';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    case UPLOAD_ERR_NO_TMP_DIR:
                        $errorMessage = 'Missing a temporary folder for uploads (check php.ini).';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    case UPLOAD_ERR_CANT_WRITE:
                        $errorMessage = 'Failed to write file to disk (check permissions of temporary directory or target directory).';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    case UPLOAD_ERR_EXTENSION:
                        $errorMessage = 'A PHP extension stopped the file upload.';
                        error_log("UploadController::upload - Error: " . $errorMessage);
                        break;
                    default:
                        $errorMessage = 'Unknown upload error occurred.';
                        error_log("UploadController::upload - Error: " . $errorMessage . " Code: " . ($_FILES[$fileFieldName]['error'] ?? 'N/A'));
                        break;
                }
            } else {
                error_log("UploadController::upload - No file field '{$fileFieldName}' found or no error code set.");
            }
            sendErrorResponse($errorMessage, 400);
        }
    }
}
