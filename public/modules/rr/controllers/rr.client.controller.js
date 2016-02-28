'use strict';


angular.module('rr').controller('RrController', ['$scope', 'Authentication', '$mdSidenav', 'Yelp', '$rootScope', 'Geolocateme',
	function($scope, Authentication, $mdSidenav, Yelp, $rootScope, Geolocateme) {
		// This provides Authentication context which I'll probably never use but it's here in case I do.
        // TODO: consider making sidenav for mobile view instead of tabs
		$scope.authentication = Authentication;
		function callYelp () {
			var request = {lat: $rootScope.currentLocale.latitude, long: $rootScope.currentLocale.longitude};
			Yelp.getYelpInfo(request.lat, request.long).then(function (response) {
				console.log('yelp response for future features', response);
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			callYelp();
		}
		$rootScope.$on('locationIsSet', function () {
			callYelp();
		});

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
