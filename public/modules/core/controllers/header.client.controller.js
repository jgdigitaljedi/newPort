'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.currentTemp = '';
		Geolocateme.setLocationVar();
		$rootScope.$on('locationIsSet', function() {
			console.log('locale', $rootScope.currentLocale);
			Weather.getConditions($rootScope.currentLocale.latitude + ',' + $rootScope.currentLocale.longitude).then(function(data) {
				$scope.currentTemp = data.temp_f;
				$scope.geoIcon = '/images/' + data.icon + '.png';
			});
		});
	}
]);