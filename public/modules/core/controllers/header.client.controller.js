'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav',
	function($scope, Authentication, Menus, $mdSidenav) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
	}
]);