'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope', '$http',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope, $http) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.currentTemp = '';
		$scope.geoIcon = '';
		$scope.userCity = '';
		$scope.socialFab = {
	        topDirections: ['left', 'up'],
	        bottomDirections: ['down', 'right'],
	        isOpen: false,
	        availableModes: ['md-fling', 'md-scale'],
	        selectedMode: 'md-fling',
	        availableDirections: ['up', 'down', 'left', 'right'],
	        selectedDirection: 'right'
	    };
	    $http.get('/lastfm').success(function(response) {
	    	console.log('lastfm', response);
	    });

		function callWeather() {
			console.log('weatherCalled', $rootScope.currentLocale);
			Weather.getConditions($rootScope.currentLocale.latitude + ',' + $rootScope.currentLocale.longitude).then(function(data) {
				console.log('data', data);
				$scope.currentTemp = data.temp_f;
				$scope.geoIcon = '/assets/images/' + data.icon + '.png';
				$scope.userCity = data.display_location.city;
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
			console.log('called location service');
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			console.log('used session storage', $rootScope.currentLocale);
			callWeather();
		}
		$rootScope.$on('locationIsSet', function() {
			callWeather();
		});
	}
]);