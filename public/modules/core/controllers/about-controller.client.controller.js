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
					template = $compile('<a href="' + ytUrl + '" target="__blank"><md-whiteframe class="md-whiteframe-z2" layout layout-align="center center">' +
						'<div class="left-half"><span class="artist-name" style="text-decoration: none; color: white"><em><u>Artist:</u></em> ' + 
					result[i].artist['#text'] + '</span><br><span class="song-name" style="text-decoration: none; color: white"><em><u>Song:</u></em>  ' + result[i].name +
					'</span></div><img src="' + result[i].image[1]['#text'] + '" class="song-image"/></a>')($scope);
				$('#lastfm-widget').append(template);
			}
			
		}

		$http.get('/lastfm').success(function(result) {
			result = result.recenttracks.track;
			makeLastFmWidget(result);
		}).error(function(result) {

		});
	}
]);