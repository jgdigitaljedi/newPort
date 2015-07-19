'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav',
	function($scope, Authentication, $mdSidenav) {
		// This provides Authentication context which I'll probably never use but it's here in case I do.
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