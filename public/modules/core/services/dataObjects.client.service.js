'use strict';
/*jshint camelcase: false */
/*global moment: false */

angular.module('core').factory('Dataobjects', [
	function() {
		var resumeObject = {
		    'experience':[
		        {
		            'type':'Work',
		            'institution':'First job institution',
		            'title':'The job title!',
		            'from':'2006-05-01',
		            'to':'2006-09-30',
		            'description':'all what i have done \n and this is a second line',
		            'default_item':false
		        },
		        {
		            'type':'Trainee',
		            'institution':'Seocond job institution',
		            'title':'The jon title!',
		            'from':'2006-05-01',
		            'to':null, /* because this is my current job, it doesn't have an end date */
		            'description':'all what i have done \n and this is a second line',
		            'default_item':true
		        }
		    ],
		    'study':[
		        {
		            'type':'Study',
		            'institution':'Fist stydy',
		            'title':'My title',
		            'from':'2007-03-01',
		            'to':'2011-12-20',
		            'description':'',
		            'default_item':false
		        },
		        {
		            'type':'Study',
		            'institution':'Also, I study another thing',
		            'title':'IDK',
		            'from':'2013-08-30',
		            'to':null,
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