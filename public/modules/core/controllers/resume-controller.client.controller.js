'use strict';

angular.module('core').controller('ResumeControllerController', ['$scope', '$window',
	function($scope, $window) {
		$scope.openFab = false;

		$scope.docClicked = function () {
            $window.open('../../assets/resume/Joey_Gauthier_resume_word.docx', '_blank');
		};

		$scope.pdfClicked = function () {
			$window.open('../../assets/resume/Joey_Gauthier_resume_compressed.pdf', '_blank');
		};
	}
]);
