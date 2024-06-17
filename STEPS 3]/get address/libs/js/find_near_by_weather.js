$('#btnRun').click(function() {
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        alert('Please enter valid latitude and longitude.');
        return;
    }

    $.ajax({
        url: "libs/php/weather.php",
        type: 'POST',
        dataType: 'json',
        data: { lat: lat, lng: lng },
        success: function(result) {
            console.log(JSON.stringify(result));

            if (result.status === "OK" || result.weatherObservation) {
                var weather = result.weatherObservation || {};

                $('#txtTemperature').html(weather.temperature ? weather.temperature + ' °C' : 'N/A');
                $('#txtHumidity').html(weather.humidity ? weather.humidity + ' %' : 'N/A');
                $('#txtWeather').html(weather.weatherCondition ? weather.weatherCondition : 'N/A');
                $('#txtWind').html(weather.windSpeed ? weather.windSpeed + ' km/h' : 'N/A');
            } else {
                console.log('Error: ' + (result.status.message || 'Unknown error.'));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' - ' + errorThrown);
            alert(console.log)
        }
    });
});
