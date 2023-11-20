<?php
// reCaptcha verification script
$secretKey = "6LdcshQpAAAAAGl7srAxtuxFe3Xh6xev6J9SIumi"; // Your secret key
$token = $_POST['token'];

// reCAPTCHA verification API URL
$url = "https://www.google.com/recaptcha/api/siteverify";

// Making POST request to verify the token
$response = file_get_contents($url . '?secret=' . $secretKey . '&response=' . $token);
$responseKeys = json_decode($response, true);

if ($responseKeys["success"]) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("success" => false));
}
?>
