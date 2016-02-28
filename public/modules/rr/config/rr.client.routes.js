'use strict';

// Setting up route
angular.module('rr').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/rr');

		$stateProvider
		.state('rr', {
			url: '/rr',
			templateUrl: 'modules/rr/views/rr.main.client.view.html'
		});
	}
]);
