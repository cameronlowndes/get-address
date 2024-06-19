$(document).ready(function() {
    $('#btnRun').click(function(e) {
        e.preventDefault(); // Prevent form submission

        var lat = $('#latitude').val(); // Changed to match HTML input ID
        var lng = $('#longitude').val(); // Changed to match HTML input ID

        // Basic validation for latitude and longitude inputs
        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
            alert('Please enter valid latitude and longitude.');
            return;
        }

        $.ajax({
            url: "libs/php/places.php", // Adjust the URL if necessary
            type: 'POST',
            dataType: 'json',
            data: { lat: lat, lng: lng },
            success: function(result) {
                console.log("Received result: ", result);

                // Check if the status is OK and the place data is present
                if (result.status && result.status.name === "ok" && result.data) {
                    var places = result.data;

                    // Clear previous results
                    $('#placeList').empty();

                    // Append new places to the list
                    places.forEach(function(place) {
                        $('#placeList').append('<li>' + place.name + ' (' + place.distance + ' km away)</li>');
                    });
                } else {
                    console.log('Error: ' + (result.status && result.status.description ? result.status.description : 'Unknown error.'));
                    alert('Failed to retrieve nearby places. Please try again.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' - ' + errorThrown);
                alert('Failed to retrieve nearby places. Please try again.');
            }
        });
    });
});
