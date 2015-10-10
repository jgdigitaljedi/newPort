'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope) {
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
        // TODO: make weather area responsive or get rid of it in mobile view

		function callWeather() {
			Weather.getConditions($rootScope.currentLocale.latitude + ',' + $rootScope.currentLocale.longitude).then(function(data) {
				$scope.currentTemp = data.temp_f;
				$scope.geoIcon = '/assets/images/' + data.icon + '.png';
				$scope.userCity = data.display_location.city;
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			callWeather();
		}
		$rootScope.$on('locationIsSet', function() {
			callWeather();
		});
	}
]);
