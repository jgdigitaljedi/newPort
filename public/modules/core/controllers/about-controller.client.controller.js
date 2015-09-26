'use strict';

angular.module('core').controller('AboutControllerController', ['$scope', '$http', '$compile', '$interval',
	function($scope, $http, $compile, $interval) {
		$scope.showloader = true;

		function makeLastFmWidget(result) {
			$scope.showloader = false;
			console.log('lastfm', result);
			for(var i = 0; i < 10; i++) {
				var artistWeb = result[i].artist['#text'].split(' ').join('+'),
					nameWeb = result[i].name.split(' ').join('+'),
					ytUrl = 'https://www.youtube.com/results?search_query=' + artistWeb + '-' + nameWeb,
					template = $compile('<a href="' + ytUrl + '" target=\'__blank\'><img src="' + result[i].image[1]['#text'] +
						'" class="song-image"/><md-tooltip style="color: black;">' + result[i].artist['#text'] + ' / ' + result[i].name +
						'</md-tooltip></a>')($scope);
				$('#lastfm-widget').append(template);

			}
			var lastfmSite = $compile('<a href="http://www.last.fm/user/joeygstrings" target=\'__blank\'>' +
				'<img class="lastfm-ender" src="assets/images/lastfm-icon.png" />' +
				'<md-tooltip style="color: black;">My Lastfm Profile</md-tooltip>')($scope);
			$('#lastfm-widget').append(lastfmSite);

		}

		$http.get('/lastfm').success(function(result) {
			result = result.recenttracks.track;
			makeLastFmWidget(result);
		}).error(function(result) {

		});
	}
]);