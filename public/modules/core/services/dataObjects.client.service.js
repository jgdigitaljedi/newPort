'use strict';
/*jshint camelcase: false */
/*global moment: false */

angular.module('core').factory('Dataobjects', [
	function() {
		var resumeObject = {
		    'experience':[
		    	{
		            'type':'Employment',
		            'institution':'AT&T Mobility',
		            'title':'Customer Service Representative',
		            'from':'2006-09-25',
		            'to':'2008-04-01',
		            'description':'Answered incoming phone calls from customers and tried to negotiate payment arrangements on past due balances.'+
		            	'\n Performed manager relief duties answering escalted phone calls and generating reports.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'Partnership Broadband',
		            'title':'Field Technician',
		            'from':'2008-11-01',
		            'to':'2014-07-12',
		            'description':'Deployed and configured wireless networking technologies on towers.'+
		            	'\n Installed service for new customers and did service tickets for established customers.',
		            'default_item':false
		        },
		    	{
		            'type':'Employment',
		            'institution':'Mobile PC Experts',
		            'title':'Owner/Technician',
		            'from':'2007-04-01',
		            'to':'2014-07-12',
		            'description':'Worked as owner and technician requiring me to balance my time between the business tasks and client services.'+
		            	'\n Provided PC repair, home theater installation, and networking solutions for customers at their home or business.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'IBM',
		            'title':'Desktop Services Technician',
		            'from':'2008-11-01',
		            'to':'2014-07-12',
		            'description':'Provided highest tier desktop and network support for clients.'+
		            	'\n Wrote VBScripts, HTAs, and batch files to automate as many repetitive tasks as possible.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'Schneider Electric',
		            'title':'Software Engineer',
		            'from':'2014-11-03',
		            'to':null, /* because this is my current job, it doesn't have an end date */
		            'description':'Design JavaScript/Angular applications to visualize tolling and traffic data. '+
		            	'\n Create many types of data visualizations using Kendo UI, D3, ChartJS, Raphael, Google Maps, and more.',
		            'default_item':true
		        }
		    ],
		    'study':[
		        {
		            'type':'Study',
		            'institution':'MakerSquare',
		            'title':'Student',
		            'from':'2014-07-14',
		            'to':'2014-10-03',
		            'description':'Learned modern web technologies, best practices, and methods.'+
		            	'\n Developed apps in JavaScript, Angular, and Rails.',
		            'default_item':false
		        }
		    ]
		};

		var materialArray = ['#F44336', '#D32F2F', '#B71C1C', '#E91E63', '#C2185B', '#880E4F', '#9C27B0', '#7B1FA2', '#4A148C', '#673AB7',
		'#512DA8', '#311B92', '#3F51B5', '#303F9F', '#1A237E', '#2196F3', '#1976D2', '#0D47A1', '#03A9F4', '#0288D1', '#01579B', '#00BCD4', 
		'#0097A7', '#006064', '#009688', '#00796B', '#004D40', '#4CAF50', '#388E3C', '#1B5E20', '#8BC34A', '#689F38', '#33691E', '#CDDC39', 
		'#AFB42B', '#827717', '#FFEB3B', '#FBC02D', '#F57F17', '#FFC107', '#FFA000', '#FF6F00', '#FF9800', '#F57C00', '#E65100', '#FF5722',
		'#E64A19', '#BF360C'];
		return {
			getResume: function () { return resumeObject; },
			getMaterialColors: function () { return materialArray; }
		};
	}
]);