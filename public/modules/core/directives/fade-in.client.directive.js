'use strict';

angular.module('core').directive('fadeIn', [
	function() {
		return {
			restrict: 'A',
			link: function($scope, $element, attrs){
				$element.addClass('ng-hide-remove');
				$element.bind('load', function() {
					$element.addClass('ng-hide-add');
				});
			}
		};
	}
]);
