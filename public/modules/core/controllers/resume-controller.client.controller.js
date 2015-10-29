'use strict';

angular.module('core').controller('ResumeControllerController', ['$scope', '$window',
	function($scope, $window) {
		// TODO: update resume to better format
		// TODO: make html resume as well
		$scope.openFab = false;

		$scope.docClicked = function () {
            $window.open('../../assets/resume/resume2015.docx', '_blank');
		};

		$scope.pdfClicked = function () {
			$window.open('../../assets/resume/resume2015.pdf', '_blank');
		};

		$scope.odtClicked = function () {
			$window.open('../../assets/resume/resume2015.odt', '_blank');
		};
	}
]);
