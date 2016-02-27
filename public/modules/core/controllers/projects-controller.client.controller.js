'use strict';
/* globals moment */

angular.module('core').controller('ProjectsControllerController', ['$scope', '$mdDialog', '$timeout', '$http', '$compile', '$window', 
    'Dataobjects',
	function($scope, $mdDialog, $timeout, $http, $compile, $window, Dataobjects) {
        // TODO: make modals more responsive an look better
        var projectVm = this;
		projectVm.radios = 'sidePro';
		projectVm.proj = Dataobjects.getProjects();
  
        projectVm.openGallery = function(which) {
            $mdDialog.show({
                controller: function GalleryController($scope, $mdDialog) {
                    $scope.which = which;
                    var thumbs = document.getElementsByClassName('film-square'),
                        tLen = thumbs.length;

                    if($scope.which.images) {
                        $scope.selectedPic = which.images[0];
                    }

                    $scope.closeGallery = function () {
                        angular.element(document.body).addClass('no-scroll');
                        $mdDialog.cancel();
                        $timeout(function() {
                            angular.element(document.body).removeClass('no-scroll');
                        }, 750);
                        //angular.element(document.body).css('overflow', 'auto');
                    };

                    $scope.changePic = function (e, picPath) {
                        angular.element(thumbs).removeClass('selected-thumb');
                        angular.element(e.target).addClass('selected-thumb');
                        angular.element(document.querySelector('.big-pic')).removeClass('fade-in');
                        $timeout(function () {
                            angular.element(document.querySelector('.big-pic')).addClass('fade-in');
                        }, 30);
                        $scope.selectedPic = picPath;
                    };
                },
                templateUrl: '/modules/core/views/modals/projects.gallery.dash.template.html',
                parent: angular.element(document.body)
            });
        };

        $scope.openGhProject = function (url) {
            $window.open(url, '_blank');
        };


        $http({
            method: 'GET',
            url: '/mygithub'
        }).then(function successCallback (response) {
            var rLen = response.data.length;
            for (var i = 0; i < rLen; i++) {
                var tooltipString = 'Language: ' + (response.data[i].language ? response.data[i].language : 'Unknown') + 
                        ' / Last Updated: ' + moment(response.data[i].updated_at).format('MM/DD/YYYY hh:mm a'),
                    template = $compile('<md-button ng-click="openGhProject(\'' + response.data[i].html_url + 
                        '\')" class="op-entry"><span>' + response.data[i].name + 
                        '</span><md-tooltip style="color: black; font-size: 1.1em;">' + tooltipString + '</md-tooltip></md-button>')($scope);
                angular.element(document.querySelector('.op-area')).append(template);
            }
        }, function errorCallback (response) {
            console.log('github info', response);
        });
	}
]);
