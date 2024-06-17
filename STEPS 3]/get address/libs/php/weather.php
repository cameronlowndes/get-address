<?php
function getNearbyWeather($lat, $lng, $username) {
    // API endpoint for nearby weather
    $url = "http://api.geonames.org/findNearByWeatherJSON?lat=$lat&lng=$lng&username=$username";

    // Initialize cURL session
    $ch = curl_init();

    // Set the URL and other options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // Execute the request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === FALSE) {
        die('Curl error: ' . curl_error($ch));
    }

    // Close the cURL session
    curl_close($ch);

    // Decode the JSON response
    $data = json_decode($response, true);

    return $data;
}

// Check if lat and lng are set via POST
if (isset($_POST['lat']) && isset($_POST['lng'])) {
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $username = 'cameron_weather';

    $result = getNearbyWeather($lat, $lng, $username);

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'Latitude and Longitude are required']);
}
?>
