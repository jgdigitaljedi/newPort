'use strict';

angular.module('core').controller('ContactControllerController', ['$scope', '$http', '$mdDialog',
	function($scope, $http, $mdDialog) {
		// TODO: fix success and failure modals and add loading animation while sending
		var contactVm = this;
		contactVm.sendEmail = function(user) {
			$http.post('/contact', {
				firstName: user.firstName,
				email: user.email,
				lastName: user.lastName,
				company: user.company,
				comment: user.comments
			}).success(function(res, status) {
				if(res.error) {
					$mdDialog.show({
					    controller: function DialogController($scope, $mdDialog) {
		            		$scope.closeDialog = function() {
		              			$mdDialog.hide();
		            		};
		          		},
					    templateUrl: '/modules/core/views/failure.contact.alert.template.html',
					    parent: angular.element(document.body)
					});
				} else {
					$mdDialog.show({
					    controller: function DialogController($scope, $mdDialog) {
		            		$scope.closeDialog = function() {
		              			$mdDialog.hide();
		            		};
		          		},
					    templateUrl: '/modules/core/views/success.contact.alert.template.html',
					    parent: angular.element(document.body)
					});
				}
			}).error(function(res) {
				$mdDialog.show({
				    controller: function DialogController($scope, $mdDialog) {
	            		$scope.closeDialog = function() {
	              			$mdDialog.hide();
	            		};
	          		},
				    templateUrl: '/modules/core/views/success.contact.alert.template.html',
				    parent: angular.element(document.body)
				});
			});

			$scope.closeDialog = function() {
				$mdDialog.hide();
			};
		};		
	}
]);
