'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav',
	function($scope, Authentication, $mdSidenav) {
		// This provides Authentication context which I'll probably never use but it's here in case I do.
        // TODO: consider making sidenav for mobile view instead of tabs
		$scope.authentication = Authentication;
		$scope.socialFab = {
	        topDirections: ['left', 'up'],
	        bottomDirections: ['down', 'right'],
	        isOpen: false,
	        availableModes: ['md-fling', 'md-scale'],
	        selectedMode: 'md-fling',
	        availableDirections: ['up', 'down', 'left', 'right'],
	        selectedDirection: 'right'
	    };
	    $scope.resume = 'Resumè';

		function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
        //$scope.makeRoute = function (which) {
        //    //$location.path() = '/' + which;
        //};

        var self = this;
        
        self.selected     = null;
        self.users        = [ ];
        self.toggleList   = toggleUsersList;
	}

]);
