var hipsterTrip = angular.module("hipsterTrip", []);

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
});

hipsterTrip.controller('placesCtrl', function($http) {
	
	var places = this;
	places.resultTable = [];

	places.getPage = function(page) {
		var baseUrl = "http://camp.efigence.com/camp/api/places/?page=";
		var url = baseUrl.concat(page);
		$http.get(url).then(function(response) {
			places.resultTable = response.data;
			places.placesTable = response.data.places;

		}, function(response) {
			alert('not ok');
		});
	}

	places.getPage(1);

	places.getOpinion = function(num) {
        var opinion = '';

        if (num <= 3.0) {
            opinion = 'Słaby';
        } else if (num > 3.0 && num <= 5.0) {
            opinion = 'Średni';
        } else if (num > 5.0 && num <= 7.0) {
            opinion = 'Dobry';
        } else if (num > 7.0 && num <= 9.0) {
            opinion = 'Bardzo dobry';
        } else if (num > 9.0) {
            opinion = 'Rewelacyjny';
        }

        return opinion;
	}

	places.getRange = function(num) {
		return new Array(num);
	}
});