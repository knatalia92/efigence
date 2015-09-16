var hipsterTrip = angular.module("hipsterTrip", ['ngRoute']);

hipsterTrip.config(function($routeProvider) {
	$routeProvider

	.when('/home', {
		templateUrl: 'pages/home.html',
		controller: 'formCtrl',
		controllerAs: 'form'
	})

	.when('/places', {
		templateUrl: 'pages/places.html',
		controller: 'placesCtrl',
		controllerAs: 'places'
	})

	.otherwise({
		redirectTo: '/home'
	})
});

hipsterTrip.controller('mainCtrl', function($location, $anchorScroll) {
	var main = this;

	main.scrollTo = function(id) {
		var old = $location.hash();
		$location.hash(id);
		$anchorScroll();
		$location.hash(old);
	}
})