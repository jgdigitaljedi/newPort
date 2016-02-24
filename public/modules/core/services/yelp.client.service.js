'use strict';
/*global moment: false */

angular.module('core').service('Yelp', ['$q', '$http',
	function ($q, $http) {


		return {
			getYelpInfo: function (request) {
				var def = $q.defer();
				$http.get('/getYelpInfo/' + request)
					.success(function (data, status, headers, config) {
						def.resolve(JSON.parse(data.content));
					})
					.error(function (data, status, headers, config) {
						def.reject({error: true});
					});
				return def.promise;
			}
		};
	}
]);