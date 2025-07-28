<?php
function sendJsonResponse($data, $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function sendErrorResponse($message, $statusCode = 500) {
    sendJsonResponse(['message' => $message], $statusCode);
}
?>