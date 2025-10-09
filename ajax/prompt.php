<?php
require_once('../../../config.php');
require_login();
sesskey();

global $USER;
$fullname = fullname($USER);
$firstname = $USER->firstname;

header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['response' => "Olá {$firstname}, tudo bem? Em que posso te ajudar hoje em Semiologia e Semiotécnica?"]);
    exit;
}

$prompt = required_param('prompt', PARAM_TEXT);

if (empty($prompt)) {
    echo json_encode(['error' => 'Prompt vazio.']);
    exit;
}

$config = get_config('local_chatbot_ai');
$api_key = $config->api_key;
$api_model = $config->api_model;
$url = "https://generativelanguage.googleapis.com/v1beta/models/{$api_model}:generateContent?key={$api_key}";

$system_instruction = get_string('context', 'local_chatbot_ai', $fullname);

$request_data = json_encode([
    "contents" => [
        [
            "role" => "user",
            "parts" => [
                ["text" => $prompt]
            ]
        ]
    ],
    "system_instruction" => [
        "parts" => [
            "text" => $system_instruction
        ]
    ]
]);


$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request_data);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$response_data = json_decode($response, true);

if ($http_code === 200 && isset($response_data['candidates'][0]['content']['parts'][0]['text'])) {
    $text = $response_data['candidates'][0]['content']['parts'][0]['text'];
    echo json_encode(['response' => $text]);
} else {
    $error_message = isset($response_data['error']['message']) ? $response_data['error']['message'] : get_string('api_error_unknown', 'local_chatbot_ai');
    echo json_encode(['error' => $error_message]);
}

exit;
