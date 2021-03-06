'use strict';
/*jshint camelcase: false */
/*global moment: false */

angular.module('rr').factory('Yelpers', [
	function () {

		function metersToMiles (meters) {
			meters = parseFloat(meters);
			if (meters < 250) {
				return (meters * 3.280839895).toFixed(2) + ' feet';
			} else {
				return (meters * 0.00062137).toFixed(2) + ' miles';				
			}
		}

		function metersToKilometers (meters) {
			meters = parseFloat(meters);
			if (meters < 250) {
				return meters.toFixed(0) + ' meters';
			} else {
				return (meters / 1000).toFixed(2) + ' km'; 
			}
		}

		return {
			distanceConversion: function (meters, unit) {
				if (unit === 'miles') {
					return metersToMiles(meters);
				} else {
					return metersToKilometers(meters);
				}
			}
		};
	}
]);