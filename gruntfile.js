'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		mochaTests: ['app/tests/**/*.js'],
		clientLESS: ['assets/less/*.less']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			},
			clientLESS: {
				files: ['assets/less/*.less','public/modules/**/*.less'],
				tasks: ['less']
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
					options: {
						jshintrc: true
					}
				}
		},
		//csslint: {
		//	options: {
		//		csslintrc: '.csslintrc',
		//	},
		//	all: {
		//		src: watchFiles.clientCSS
		//	}
		//},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions', 'ie >= 8']
					})
				]
			},
			dist: {
				src: 'public/dist/core.css'
			}
		},
        concat: {
            js: { //target
                src: ['public/dist/*.js'],
                dest: 'public/dist/concatted.js'
            }
        },
    	less: {
      		development: {
				options: {
					paths: []
				},
				files: [{
					src: ['assets/less/*.less', 'public/modules/**/*.less'],
					dest: 'public/modules/core/css/core.css'
				}]
      		},
      		production: {
          		options: {
              		paths: []
          		},
          		files: [{
              		src: ['assets/less/*.less', 'public/modules/**/*.less'],
              		dest: 'public/dist/core.css'
          		}]
      		}
    	},
		uglify: {
            //options: {
            //	mangle: false
            //},
            my_target: {
                files: [{
                    src: ['public/dist/concatted.js'],
                    dest: 'public/dist/app.js'
                }]
            }
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
            options: {
                singleQuotes: true
            },
			production: {
				files: {
					//'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
					'public/dist/config.js': ['public/config.js'],
					'public/dist/application.js': ['public/application.js'],
					'public/dist/about.js': ['public/modules/core/controllers/about-controller.client.controller.js'],
					'public/dist/contact.js': ['public/modules/core/controllers/contact-controller.client.controller.js'],
					'public/dist/fun.js': ['public/modules/core/controllers/fun-controller.client.controller.js'],
					'public/dist/header.js': ['public/modules/core/controllers/header-controller.client.controller.js'],
					'public/dist/home.js': ['public/modules/core/controllers/home-controller.client.controller.js'],
					'public/dist/projects.js': ['public/modules/controllers/core/projects-controller.client.controller.js'],
					'public/dist/resume.js': ['public/modules/controllers/core/resume-controller.client.controller.js'],
					'public/dist/menus.js': ['public/modules/core/services/menus.client.service.js'],
					'public/dist/geo.js': ['public/modules/core/services/geolocate.client.service.js'],
					'public/dist/weather.js': ['public/modules/core/services/weather.client.service.js']
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			}
		}
		//mochaTest: {
		//	src: watchFiles.mochaTests,
		//	options: {
		//		reporter: 'spec',
		//		require: 'server.js'
		//	}
		//},
		//karma: {
		//	unit: {
		//		configFile: 'karma.conf.js'
		//	}
		//}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'less', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['loadConfig', 'ngAnnotate', 'concat', 'uglify', 'less', 'postcss', 'cssmin']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
