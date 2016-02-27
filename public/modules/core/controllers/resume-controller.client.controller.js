'use strict';

angular.module('core').controller('ResumeControllerController', ['$window', 'D3Resume', 'Dataobjects',
	function($window, D3Resume, Dataobjects) {
		var resumeVm = this;
		resumeVm.openFab = false;

		resumeVm.docClicked = function () {
            $window.open('../../assets/resume/resume2015.docx', '_blank');
		};

		resumeVm.pdfClicked = function () {
			$window.open('../../assets/resume/resume2015.pdf', '_blank');
		};

		resumeVm.odtClicked = function () {
			$window.open('../../assets/resume/resume2015.odt', '_blank');
		};

		// var resume = new D3Resume({
		D3Resume.getResumeLogic({
		  	width: window.innerWidth - 40,
		  	height: 420,
		  	wrapperSelector: '#resume',
		  	// dataUrl: 'resume.json',
		  	getItemFillCollor: function (item) {
		  		var colorArr = Dataobjects.getMaterialColors();
		  		return colorArr[Math.floor(Math.random()*48)];
		    	// return '#' + (function co(lor){   return (lor +=
		      	//	[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length === 6) ?  lor : co(lor); })('');
		  	}
		});
	}
]);
