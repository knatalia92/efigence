hipsterTrip.controller('homeCtrl', function($http, $location, $anchorScroll) {
	
	var home = this;
	home.user = {};
	home.error = {};

 	// GOOGLE MAPS
    var position = [52.18483, 21.00070];

    home.showGoogleMaps = function() {
        var latLng = new google.maps.LatLng(position[0], position[1]);

        var mapOptions = {
            zoom: 16, 
            streetViewControl: false, 
            scaleControl: true, 
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: latLng,
            scrollwheel: false
        };

        map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
    }

    home.showGoogleMaps();
	
	home.submitForm = function($event) {
		$event.preventDefault();
		$http.post("http://camp.efigence.com/camp/api/contact", home.user).then(function(response) {
			alert("Formularz wysłano poprawnie");
			home.error = {};
			home.user = {};
		}, function(response) {
			home.error = response.data.errors;
		});
	}

	home.openModal = function($event, modalId) {
		$event.preventDefault();
		var modal = document.getElementById(modalId);
		modal.style.visibility = "visible";
		modal.style.opacity = 1;
	}

	home.closeModal = function($event, modalId) {
		$event.preventDefault();
		var modal = document.getElementById(modalId);
		modal.style.visibility = "hidden";
		modal.style.opacity = 0;
	}

	var video = document.getElementById('video');
    var play = document.querySelector('.play-pause');

    play.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            play.style.display = 'none';
        }
    });

    video.addEventListener('click', function() {
        if (video.play) {
            video.pause();
            play.style.display = 'inline-block';
        }
    });

    video.addEventListener('ended', function() {
        play.style.display = 'inline-block';
    });

    var inputs = document.querySelectorAll('input');
    var textarea = document.querySelector('textarea');

    for(var i = 0; i < inputs.length; i++) {
        (function(j) {
            var txt = inputs[j].placeholder;

            inputs[j].addEventListener('focus', function() {
                this.removeAttribute('placeholder');
            });

            inputs[j].addEventListener('blur', function() {
                this.setAttribute('placeholder', txt);
            })
        })(i);
    }

    if(textarea) {
        var txtareaPl = textarea.placeholder;

        textarea.addEventListener('focus', function() {
            this.removeAttribute('placeholder');
        });

        textarea.addEventListener('blur', function() {
            this.setAttribute('placeholder', txtareaPl);
        });
    }

});