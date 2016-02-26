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
		            'description':'Provided desktop and network IT solutions to clients. \n Wrote desktop applications to streamline work.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'Partnership Broadband',
		            'title':'Field Technician',
		            'from':'2008-11-01',
		            'to':'2014-07-12',
		            'description':'Provided desktop and network IT solutions to clients. \n Wrote desktop applications to streamline work.',
		            'default_item':false
		        },
		    	{
		            'type':'Employment',
		            'institution':'Mobile PC Experts',
		            'title':'Owner/Technician',
		            'from':'2008-01-01',
		            'to':'2014-07-12',
		            'description':'Provided desktop and network IT solutions to clients. \n Wrote desktop applications to streamline work.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'IBM',
		            'title':'Desktop Services Technician',
		            'from':'2008-11-01',
		            'to':'2014-07-12',
		            'description':'Provided desktop and network IT solutions to clients. \n Wrote desktop applications to streamline work.',
		            'default_item':false
		        },
		        {
		            'type':'Employment',
		            'institution':'Schneider Electric',
		            'title':'Software Engineer',
		            'from':'2014-11-03',
		            'to':null, /* because this is my current job, it doesn't have an end date */
		            'description':'Built and deployed MEAN stack applications. \n Did things the Agile way and in a team environment.',
		            'default_item':true
		        }
		    ],
		    'study':[
		        {
		            'type':'Study',
		            'institution':'MakerSquare',
		            'title':'student',
		            'from':'2014-07-14',
		            'to':'2014-10-03',
		            'description':'',
		            'default_item':false
		        }
		    ]
		};
		return {
			getResume: function () { return resumeObject; }
		};
	}
]);