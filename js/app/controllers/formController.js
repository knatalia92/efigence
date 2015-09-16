hipsterTrip.controller('formCtrl', function($http) {
	
	var form = this;
	form.user = {};
	form.error = {};
	
	form.submitForm = function($event) {
		$event.preventDefault();
		$http.post("http://camp.efigence.com/camp/api/contact", form.user).then(function(response) {
			alert("Formularz wysłano poprawnie");
			form.error = {};
			form.user = {};
		}, function(response) {
			form.error = response.data.errors;
		});
	}

	form.openModal = function($event, modalId) {
		$event.preventDefault();
		var modal = document.getElementById(modalId);
		modal.style.visibility = "visible";
		modal.style.opacity = 1;
	}

	form.closeModal = function($event, modalId) {
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

});