'use strict';

module.exports = {
	app: {
		title: 'Joey Gauthier',
		description: 'AngularJS',
		keywords: 'AngularJS, Angular-Material'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/angular-material/angular-material.css'
				// 'public/lib/angular-material/modules/css/**/*.css',

			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/d3/d3.min.js'
			]
				// 'public/lib//angular-material/modules/js/**/*.js'
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};