$(document).ready(function() {
    $('#btnRun').click(function() {
        var lat = $('#lat').val();
        var lng = $('#lng').val();

        // Basic validation for latitude and longitude inputs
        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
            alert('Please enter valid latitude and longitude.');
            return;
        }

        $.ajax({
            url: "libs/php/weather.php", // Adjust the URL if necessary
            type: 'POST',
            dataType: 'json',
            data: { lat: lat, lng: lng },
            success: function(result) {
                console.log("Received result: ", result);

                // Check if the status is OK and the weatherObservation data is present
                if (result.status && result.status.name === "ok" && result.data.weatherObservation) {
                    var weather = result.data.weatherObservation;

                    // Update the HTML elements with the weather data
                    $('#txtTemperature').html(weather.temperature ? weather.temperature + ' °C' : 'N/A');
                    $('#txtHumidity').html(weather.humidity ? weather.humidity + ' %' : 'N/A');
                    $('#txtWeather').html(weather.weatherCondition && weather.weatherCondition !== "n/a" ? weather.weatherCondition : 'N/A');
                    $('#txtWind').html(weather.windSpeed ? weather.windSpeed + ' km/h' : 'N/A');
                    $('#txtClouds').html(weather.clouds ? weather.clouds : 'N/A');
                    $('#txtStation').html(weather.stationName ? weather.stationName : 'N/A');
                    $('#txtDateTime').html(weather.datetime ? weather.datetime : 'N/A');
                } else {
                    console.log('Error: ' + (result.status && result.status.description ? result.status.description : 'Unknown error.'));
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' - ' + errorThrown);
                alert('Failed to retrieve weather data. Please try again.');
            }
        });
    });
});
