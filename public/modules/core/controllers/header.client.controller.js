'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope', 'Yelp',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope, Yelp) {
		var headerVm = this;
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		headerVm.currentTemp = '';
		headerVm.geoIcon = '';
		headerVm.userCity = '';
		// $scope.socialFab = {
	 //        topDirections: ['left', 'up'],
	 //        bottomDirections: ['down', 'right'],
	 //        isOpen: false,
	 //        availableModes: ['md-fling', 'md-scale'],
	 //        selectedMode: 'md-fling',
	 //        availableDirections: ['up', 'down', 'left', 'right'],
	 //        selectedDirection: 'right'
	 //    };
  //       // TODO: make weather area responsive or get rid of it in mobile view

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
			callWeather();
		}
		$rootScope.$on('locationIsSet', function () {
			callYelp();
			callWeather();
		});
	}
]);
