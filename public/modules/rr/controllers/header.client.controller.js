'use strict';

angular.module('rr').controller('RrHeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope', 'Yelp',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope, Yelp) {
		var rrHeadVm = this;
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		
		function callYelp () {
			var request = {lat: $rootScope.currentLocale.latitude, long: $rootScope.currentLocale.longitude};
			Yelp.getYelpInfo(request.lat, request.long).then(function (response) {
				console.log('yelp response for future features', response);
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
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
