'use strict';

angular.module('core').controller('ContactControllerController', ['$scope', '$http',
	function($scope, $http) {
		$scope.sendEmail = function(user) {
			console.log('first name', user.firstName);
			console.log('last name', user.lastName);
			console.log('email', user.email);
			console.log('comments', user.comments);
			$http.post('/contact', {
				firstName: user.firstName,
				email: user.email,
				lastName: user.lastName,
				company: user.company,
				comment: user.comments
			}).success(function(res) {

			}).error(function(res) {

			});
		};
		
	}
]);