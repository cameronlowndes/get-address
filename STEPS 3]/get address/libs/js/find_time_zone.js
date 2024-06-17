	$('#btnRun').click(function() {

		$.ajax({
			url: "libs/php/timezone.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat:$('#lat').val(),
				lng:$('#lng').val()
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					$('#txtStreet').html(result.data.sunrise);
					$('#txtAdminArea').html(result.data.countryCode);

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
			}
		}); 
	
	});