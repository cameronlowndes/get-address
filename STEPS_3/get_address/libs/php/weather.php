<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

function getNearbyWeather($lat, $lng, $username) {
    $url = "http://api.geonames.org/findNearByWeatherJSON?lat=$lat&lng=$lng&username=$username";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $response = curl_exec($ch);

    if ($response === FALSE) {
        return ['error' => 'Curl error: ' . curl_error($ch)];
    }

    curl_close($ch);

    return json_decode($response, true);
}

if (isset($_POST['lat']) && isset($_POST['lng'])) {
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $username = 'cameron_2321';

    $result = getNearbyWeather($lat, $lng, $username);

    $output = [
        'status' => [
            'code' => '200',
            'name' => 'ok',
            'description' => 'success',
            'returnedIn' => intval((microtime(true) - $executionStartTime) * 1000) . " ms"
        ],
        'data' => $result
    ];

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} else {
    echo json_encode(['error' => 'Latitude and Longitude are required']);
}

?>
