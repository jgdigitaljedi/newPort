'use strict';

angular.module('core').directive('steamWidget', ['Social',
	function (Social) {
		return {
			scope: {
				steamData: '=',
				steamGames: '='
			},
			restrict: 'E',
			replace: 'true',
			templateUrl: '../modules/core/directives/steamWidget.client.directive.html',
			link: function (scope, elem, attrs) {
				// scope.player = scope.steamData.response.players[0];
				// console.log('scope player', scope.player);

				Social.getSteam().then(function (response) {
					scope.player = response[0].response.players[0];
					scope.games = response[1];
					console.log('player', scope.player);
					// make a profile widget with owned games underneath
				});
	        }
		};
	}
]);