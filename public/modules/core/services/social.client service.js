'use strict';
/*global moment: false */

angular.module('core').service('Social', ['$q', '$http',
	function ($q, $http) {

		function getSteamProfile () {
			var def = $q.defer();
			$http.get('/steam')
				.success(function (data, status, headers, config) {
					def.resolve(data);
				})
				.error(function (data, status, headers, config) {
					def.reject({error: true});
				});
			return def.promise;
		}

		function getSteamRecents () {
			var def = $q.defer();
			$http.get('/games')
				.success(function (data, status, headers, config) {
					def.resolve(data);
				})
				.error(function (data, status, headers, config) {
					def.reject({error: true});
				});
			return def.promise;
		}

		return {
			getSteam: function () {
				return $q.all([getSteamProfile(), getSteamRecents()]);
			}
		};
	}
]);