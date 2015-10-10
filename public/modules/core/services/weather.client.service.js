'use strict';
/*jshint camelcase: false */
/*global moment: false */

angular.module('core').service('Weather', ['$q', '$http',
	function($q, $http) {
		var nowTimestamp = moment().unix(),
			cachedConditions = null,
			conditionsTimestamp = null,
			cachedForecast = null,
			forecastTimestamp = null;
		return {
			getConditions: function(locale) {
				var def = $q.defer();
				nowTimestamp = moment().unix();
				conditionsTimestamp = parseInt(sessionStorage.getItem(locale.toString() + 'weatherTimestamp'));
				// cachedConditions = sessionStorage.getItem(locale.toString() + 'conditions') ? JSON.parse(sessionStorage.getItem(locale.toString() + 'conditions')) : null;
				if(!cachedConditions || nowTimestamp - conditionsTimestamp >= 900) { // get on first call then get again if cached for more that 15 minutes
					$http.get('/conditions/' + locale)
					.success(function(data, status, headers, config) {
						sessionStorage.setItem(locale.toString() + 'weatherTimestamp', moment().unix().toString());
						sessionStorage.setItem(locale.toString() + 'conditions', JSON.stringify(data.current_observation));
				        def.resolve(data.current_observation);
					}).error(function(data, status, headers, config) {
						if(data === null && cachedConditions) {
							def.resolve(cachedConditions);
						} else {
							console.log('unable to fetch weather ', status);
							def.reject(status);
						}                  
					});
					return def.promise;
				} else {
					def.resolve(cachedConditions);
					return def.promise;
				}
			}
			// getForecast: function(locale) {
			// 	var def = $q.defer();
			// 	nowTimestamp = moment().unix();
			// 	forecastTimestamp = parseInt(sessionStorage.getItem(locale.toString() + 'forecastTimestamp'));
			// 	cachedForecast = sessionStorage.getItem(locale.toString() + 'forecast') ? JSON.parse(sessionStorage.getItem(locale.toString() + 'forecast')) : null;
			// 	if(!cachedForecast || nowTimestamp - forecastTimestamp >= 900) { // get on first call then get again if cached for more that 15 minutes
			// 		$http.get(weatherURL + 'forecast/q/' + locale + '.json')
			// 		.success(function(data, status, headers, config) {
			// 			sessionStorage.setItem(locale.toString() + 'forecast', JSON.stringify(data.forecast.simpleforecast));
			// 			sessionStorage.setItem(locale.toString() + 'forecastTimestamp', moment().unix().toString());
			// 			def.resolve(data.forecast.simpleforecast);
			// 		}).error(function(data, status, headers, config) {
			// 			if(data === null && cachedForecast) {
			// 				def.resolve(cachedForecast);
			// 			} else {
			// 				console.log('unable to fetch weather ', status);
			// 				def.reject(status);
			// 			}
			// 		});
			// 		return def.promise;
			// 	} else {
			// 		def.resolve(cachedForecast);
			// 		return def.promise;
			// 	}
			// }
		};
	}
]);
