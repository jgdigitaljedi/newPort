'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope) {
		var headerVm = this;
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		headerVm.currentTemp = '';
		headerVm.geoIcon = '';
		headerVm.userCity = '';

		function callWeather () {
			Weather.getConditions($rootScope.currentLocale.latitude + ',' + $rootScope.currentLocale.longitude).then(function (data) {
				if (data.error) {
					headerVm.showWeather = false;
				} else {
					headerVm.showWeather = true;
					headerVm.currentTemp = data.temp_f;
					headerVm.geoIcon = '/assets/images/' + data.icon + '.png';
					headerVm.userCity = data.display_location.city;					
				}
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			callWeather();
		}
		$rootScope.$on('locationIsSet', function () {
			callWeather();
		});
	}
]);
