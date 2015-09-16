hipsterTrip.controller('placesCtrl', function($http, $routeParams) {
	
	var places = this;
	places.page = 1;
	places.resultTable = [];

	places.getPage = function(page) {
		places.page = page;
		
		if (places.page == 5) {
			places.page = 1;
		} else if (places.page == 0) {
			places.page = 4;
		}

		var baseUrl = "http://camp.efigence.com/camp/api/places/?page=";
		var url = baseUrl.concat(places.page);
		$http.get(url).then(function(response) {
			places.resultTable = response.data;
			document.querySelector('.information-table').scrollIntoView();
		}, function(response) {
			alert('Wystąpił problem podczas pobierania danych z serwera.');
			for(var i = 0; i < response.data.length; i++) {
				console.log(response.data[i]);
			}
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