'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$timeout',
	function($scope, Authentication, $mdSidenav, $timeout) {
		// This provides Authentication context which I'll probably never use but it's here in case I do.
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

        var self = this;
        
        self.selected     = null;
        self.users        = [ ];
        self.toggleList   = toggleUsersList;
	}

]);
