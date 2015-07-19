'use strict';
/*global moment: false */

angular.module('core').factory('Geolocateme', ['$rootScope',
	function($rootScope) {
		return {
			setLocationVar: function() {
				function getLocation(location) {
				    	$rootScope.currentLocale = {'latitude': location.coords.latitude, 'longitude': location.coords.longitude, 'accuracy': location.coords.accuracy, 'error': 'none'};
						$rootScope.$broadcast('locationIsSet');
				}

				function localeDenied(error) {
				    console.log('error', error);
				    $rootScope.currentLocale = {'latitude': 'error', 'longitude': 'error', 'accuracy': 'error', 'error': error};
				    $rootScope.$broadcast('locationDenied');
				}

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(getLocation, localeDenied);
				} else {
					$rootScope.currentLocale = {'latitude': 'not supported', 'longitude': 'not supported', 'accuracy': 'not supported', 'error': 'not supported'};
					$rootScope.$broadcast('locationNotPossible');
				}
			}
		};
	}
]);