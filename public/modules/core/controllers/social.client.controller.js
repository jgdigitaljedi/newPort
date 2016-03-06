'use strict';

angular.module('core').controller('SocialController', ['$scope', '$http', 'Social',
	function($scope, $http, Social) {
		var socialVm = this;

		// TODO: add share buttons
		// TODO: add twitter feed
		// TODO: add youtube feed
		// TODO: add G+ feed
		// TODO: add LastFm stuff

		// steam section
		// Social.getSteam().then(function (response) {
		// 	socialVm.player = response[0];
		// 	socialVm.games = response[1];
		// 	console.log('player', response[0]);
		// 	// make a profile widget with owned games underneath
		// });

	}
]);