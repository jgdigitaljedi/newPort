'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav',
	function($scope, Authentication, $mdSidenav) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        var self = this;
        
       self.selected     = null;
       self.users        = [ ];
       self.toggleList   = toggleUsersList;
	}
]);