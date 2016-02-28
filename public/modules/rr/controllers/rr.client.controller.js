'use strict';


angular.module('rr').controller('RrController', ['$scope', 'Authentication', '$mdSidenav', 'Yelp', '$rootScope', 'Geolocateme', 'Yelpers',
	function($scope, Authentication, $mdSidenav, Yelp, $rootScope, Geolocateme, Yelpers) {
		var rrVm = this;

		function callYelp () {
			var request = {lat: $rootScope.currentLocale.latitude, long: $rootScope.currentLocale.longitude};
			Yelp.getYelpInfo(request.lat, request.long).then(function (response) {
				console.log('yelp response for future features', response);
			});
		}
		if (!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			callYelp();
		}
		$rootScope.$on('locationIsSet', function () {
			callYelp();
		});
	}

]);
