'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'newportfolio';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize', 'ngMaterial', 'ui.router', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',  '$mdThemingProvider', '$mdIconProvider',
	function($locationProvider, $mdThemingProvider, $mdIconProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');

	$mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('amber').dark();
 
        // Register the user `avatar` icons
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128)
            .icon('menu'       , './assets/svg/menu.svg'        , 24)
            .icon('share'      , './assets/svg/share.svg'       , 24)
            .icon('google_plus', './assets/svg/google_plus.svg' , 512)
            .icon('hangouts'   , './assets/svg/hangouts.svg'    , 512)
            .icon('twitter'    , './assets/svg/twitter.svg'     , 512)
            .icon('phone'      , './assets/svg/phone.svg'       , 512);
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('AboutControllerController', ['$scope', '$http', '$compile', '$interval',
	function($scope, $http, $compile, $interval) {
		$scope.showloader = true;
        $scope.showLastfm = true;

		function makeLastFmWidget(result) {
			$scope.showloader = false;
			console.log('lastfm', result);
			for(var i = 0; i < 5; i++) {
				var artistWeb = result[i].artist['#text'].split(' ').join('+'),
					nameWeb = result[i].name.split(' ').join('+'),
					ytUrl = 'https://www.youtube.com/results?search_query=' + artistWeb + '-' + nameWeb,
                    albumImage = result[i].image[1]['#text'] ? result[i].image[1]['#text'] : '../../../assets/images/no-image.png',
					template = $compile('<a href="' + ytUrl + '" target=\'__blank\'><img src="' + albumImage +
						'" class="song-image"/><md-tooltip style="color: black;">' + result[i].artist['#text'] + ' / ' + result[i].name +
						'</md-tooltip></a>')($scope);
				$('#lastfm-widget').append(template);

			}
			var lastfmSite = $compile('<a href="http://www.last.fm/user/joeygstrings" target=\'__blank\'>' +
				'<img class="lastfm-ender" src="assets/images/lastfm-icon.png" />' +
				'<md-tooltip style="color: black;">My Lastfm Profile</md-tooltip>')($scope);
			$('#lastfm-widget').append(lastfmSite);

		}

		$http.get('/lastfm').success(function(result) {
			result = result.recenttracks.track;
			makeLastFmWidget(result);
		}).error(function(result) {
			$scope.showLastfm = false;
		});
	}
]);

'use strict';

angular.module('core').controller('ContactControllerController', ['$scope', '$http', '$mdDialog',
	function($scope, $http, $mdDialog) {
		$scope.sendEmail = function(user) {
			console.log('first name', user.firstName);
			console.log('last name', user.lastName);
			console.log('email', user.email);
			console.log('comments', user.comments);
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
			}
		};
		
	}
]);
'use strict';

angular.module('core').controller('FunControllerController', ['$scope',
	function($scope) {
		// Fun controller controller logic
		// ...
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$mdSidenav', 'Geolocateme', 'Weather', '$rootScope', '$http',
	function($scope, Authentication, Menus, $mdSidenav, Geolocateme, Weather, $rootScope, $http) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.currentTemp = '';
		$scope.geoIcon = '';
		$scope.userCity = '';
		$scope.socialFab = {
	        topDirections: ['left', 'up'],
	        bottomDirections: ['down', 'right'],
	        isOpen: false,
	        availableModes: ['md-fling', 'md-scale'],
	        selectedMode: 'md-fling',
	        availableDirections: ['up', 'down', 'left', 'right'],
	        selectedDirection: 'right'
	    };
	    $http.get('/lastfm').success(function(response) {
	    	console.log('lastfm', response);
	    });

		function callWeather() {
			console.log('weatherCalled', $rootScope.currentLocale);
			Weather.getConditions($rootScope.currentLocale.latitude + ',' + $rootScope.currentLocale.longitude).then(function(data) {
				console.log('data', data);
				$scope.currentTemp = data.temp_f;
				$scope.geoIcon = '/assets/images/' + data.icon + '.png';
				$scope.userCity = data.display_location.city;
			});
		}
		if(!sessionStorage.getItem('geoLocation')) {
			Geolocateme.setLocationVar();
			console.log('called location service');
		} else {
			$rootScope.currentLocale = JSON.parse(sessionStorage.getItem('geoLocation'));
			console.log('used session storage', $rootScope.currentLocale);
			callWeather();
		}
		$rootScope.$on('locationIsSet', function() {
			callWeather();
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$timeout',
	function($scope, Authentication, $mdSidenav, $timeout) {
		// This provides Authentication context which I'll probably never use but it's here in case I do.
		$scope.authentication = Authentication;
		$scope.socialFab = {
	        topDirections: ['left', 'up'],
	        bottomDirections: ['down', 'right'],
	        isOpen: false,
	        availableModes: ['md-fling', 'md-scale'],
	        selectedMode: 'md-fling',
	        availableDirections: ['up', 'down', 'left', 'right'],
	        selectedDirection: 'right'
	    };
	    $scope.resume = 'Resumè';

		function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        var self = this;
        
        self.selected     = null;
        self.users        = [ ];
        self.toggleList   = toggleUsersList;
	}

]);

'use strict';

angular.module('core').controller('ProjectsControllerController', ['$scope', '$mdDialog', '$timeout', '$http', '$compile', '$window',
	function($scope, $mdDialog, $timeout, $http, $compile, $window) {
		$scope.radios = 'sidePro';
		$scope.proj = {
			dash: {
				title: 'My Dash',
                images: ['../../assets/images/dash/dash-gallery-1.png', '../../assets/images/dash/dash-gallery-2.png', '../../assets/images/dash/dash-gallery-3.png',
                    '../../assets/images/dash/dash-gallery-4.png', '../../assets/images/dash/dash-gallery-5.png', '../../assets/images/dash/dash-gallery-6.png'],
                description: 'Get randomized restaurant and bar suggestions, view weather info and radar, track packages, ' +
                'view phone notifications, and control your HomeJS devices all from one screen! I have not launched this app ' +
                'because I want to rebuild it with my newly learned superpowers!',
                link: false,
                github: 'https://github.com/jgdigitaljedi/dashboard',
                techs: 'AngularJS, Bootstrap',
                apis: 'FourSquare, WeatherUnderground, Openweathermap, Boxoh, Pushbullet, HomeJS, Firebase, and Google Maps'
			},
            lassos: {
                title: 'Texas Lassos Alumni Connect',
                images: ['../../assets/images/lassos/lassos-gallery-1.png', '../../assets/images/lassos/lassos-gallery-2.png', '../../assets/images/lassos/lassos-gallery-3.png',
                    '../../assets/images/lassos/lassos_admin.png', '../../assets/images/lassos/lassos_profile.png'],
                description: 'This application was built by request for the Texas Lassos Alumni Group. I worked on a team with two other development students' +
                ' to create a privatized social network for this Alumni group. The application has a table for all alums and a table for alums who have joined the social' +
                ' network. Upon signing up, the app notifies the admins that someone is pending approval, notifies the user they must wait for approval, and ' +
                'looks for the user information in the alum table to see if it can move it to the active user table but still keep them inactive. After approval' +
                ' the user is notified to log in and can fill out their profile, search for other alums, and more. Admins can import new alums via Excel sheet' +
                ' and export the whole database to an Excel sheet as well.',
                link: 'http://connect.lassoalumni.org/users/sign_in',
                github: 'https://github.com/jgdigitaljedi/tx-lassos',
                techs: 'Ruby on Rails, Devise gem, Roo gem, jQuery, Bootstrap'
            },
            rr: {
                title: 'Restaurant Roulette',
                images: ['../../assets/images/rr/rr-gallery-1.png', '../../assets/images/rr/rr-gallery-2.png', '../../assets/images/rr/rr-gallery-3.png', '../../assets/images/rr/rr-gallery-4.png',
                    '../../assets/images/rr/rr-gallery-5.png', '../../assets/images/rr/rr-gallery-6.png', ],
                description: 'This app was done during a 2 day hackathon when I was completely new to Angular so I chose to use it as a way to teach myself how it works . It geolocates you via IP address,' +
                ' gets a list of 30 restaurants near you via the FourSquare API, then randomly selects 2 choices for you providing you with a website link and ' +
                'Google map for each one. The idea was to take the trouble out of deciding where to eat lunch. I have plans to do a complete rewrite and host it on this server eventually',
                link: 'http://development.restaurant-roulette.divshot.io/',
                github: 'https://github.com/jgdigitaljedi/hackday/tree/gh-pages',
                techs: 'AngularJS, Angular-strap',
                apis: 'Foursquare, Google Maps'
            },
            toolbox: {
                title: 'Toolbox',
                images: ['../../assets/images/toolbox-screen.png'],
                description: 'After writing a countless number of vbscripts and batch files to perform remote and batch tasks, I finally decided to write an' +
                ' HTA to give the script collection a GUI and make it easier for anyone to use my scripts. Although a lot of features had to be removed prior' +
                ' to posting to GitHub because they contained server addresses or were for very client specific tasks, the project is still huge and loaded with' +
                ' functionality. I used vbscript, JavaScript, HTML, and CSS to generate an HTA that has many external vbscript and batch file dependencies. This ' +
                'is a Windows desktop app made to function inside a Windows domain and was made for people in IT positions.',
                link: false,
                github: 'https://github.com/jgdigitaljedi/myToolBox',
                techs: 'VBScript, batch, JavaScript, ActiveX'
            },
            portfolio: {
                title: 'Portfolio',
                description: 'Well, this is the page you\'re looking at right now. Why list it as a project? There\'s a lot going on here, that\'s why! For starters, I deploy my team\'s apps at work ' +
                'so I decided I might as well rough it here too. This is running on a DigitalOcean server and I used zero helpers to get it up and running. All configuration ' +
                'was done through ssh. Aside from that and just from generally liking what I\'ve done here, I\'ve got some things going on that you can\'t see. I decided to use this server for more ' +
                'than just hosting my portfolio. I\'ve used Express to make routes that just return data to me. For example, got to http://joeyg.me/morning and you\'ll see a string returned ' +
                'that is talking about traffic and weather. I use an app called Tasker on my phone to hit that address in the morning when my phone connects to the bluetooth in my truck. That ' +
                'string is then read aloud to me over my truck\s stereo so I know what to expect my commute to be like. I am also working on integrating a call to my calendar to read back my ' +
                'events for the day as well. I have more plans for the server too, but time is greatest my obstacle. \n \n TLDR: I am doing some cool things with this server I have setup!',
                github: 'https://github.com/jgdigitaljedi/newPort',
                techs: 'MongoDB, ExpressJS, AngularJS, NodeJS, Angular Material, MomentJS, Nodemailer',
                apis: 'Weather Underground, Last.fm, Bing Maps, GitHub'
            },
            host: {
                title: 'Host Reports',
                description: 'DUE TO A NONDISCLOSURE AGREEMENT, I AM LIMITED AS TO WHAT I CAN SAY ABOUT THIS APP AND CANNOT PROVIDE IMAGES. The purpose of this app is to give very' +
                ' detailed, highly customizable reports to the client across a wide array of data sets. The app is' +
                ' completely dynamic meaning if new methods for generating reports are added to the backend, the app will automatically add the report name to the side' +
                ' navbar and generate the report page without any additional development. This was made possible due to the fact that the app makes a call on load to see what' +
                ' reports are available. Once the client navigates to a report, a call is made to get the report definition which allows the app to know what kind of input fields ' +
                'should be used and how to format the tables and generate the charts. All data calls are done as Ajax requests to Python methods. We also wrote some PHP to handle CORS issues. ' +
                'The app also has the current weather conditions in the navigation bar for the client\'s convenience. ',
                apis: 'Weather Underground',
                techs: 'Bootstrap, jQuery, Bootstrap Tables, MomentJS, D3, ChartJS, Raphael',
                members: 4
            },
            roms: {
                title: 'WebROMS',
                description: 'DUE TO A NONDISCLOSURE AGREEMENT, I AM LIMITED AS TO WHAT I CAN SAY ABOUT THIS APP AND CANNOT PROVIDE IMAGES. This app was meant for our internal technicians ' +
                'as well as the people in a more technical role in our client\'s organization. This application visualizes data with interactive maps, multiple chart types, and Kendo grids. ' +
                'Additionally, there is an admin panel built in allowing for granular permissions controls for user groups allowing management to control who can see and do what in the application. ' +
                'The highlight of the application is a completely customizable dashboard that allows the user to add widgets and arrange widgets. A user can select what kind of widget they would like, ' +
                'what data set will be visualized, widget location on the dashboard, and the widget size. As an added bonus, I added the ability to change the color of any widget and save the widget layout to our MongoDB allowing the ' +
                'user to immediately pull up their preferred layout on application launch. All data calls are made through a Soap service running on our node server that converts the xml to JSON' +
                ' and back allowing the team to make standard http requests.',
                apis: 'Weather Underground, Google Maps',
                techs: 'AngularJS, ExpressJS, NodeJS, MongoDB, Kendo UI, Bootstrap, MomentJS, Gridster',
                members: 7
            },
            elcc: {
                title: 'ELCC',
                description: 'DUE TO A NONDISCLOSURE AGREEMENT, I AM LIMITED AS TO WHAT I CAN SAY ABOUT THIS APP AND CANNOT PROVIDE IMAGES. This is my most recent project and the entire UI' +
                ' was written by myself and 1 other team member. The purpose of the application was to allow our clients to monitor their toll roads at the sensor level. This allows for ' +
                'traffic map generation, more visualizations for the client, and the creation of a dynamic pricing engine that adjusts the toll rates according to the current volume and ' +
                'historical data. This application was more focused on traffic, rates, and transactions than the others I\'ve worked on professionally. The granular security components are more ' +
                'widesporead throughout this application because the user can change toll rates and signs from this application, granted they have the permissions or have a supervisor override. The ' +
                'application features maps with clickable canvas elements that change data parameters represented on the page; almost every chart type available in Kendo UI with date/time pickers ' +
                'and dropdowns to change the parameters and rebuild the charts; grids that can be sorted, filtered, and reordered; live camera feeds; and much more. During development the decision ' +
                'was made to take the design into a material design direction making this the most visually appealing app I have been a part of yet.',
                apis: 'Weather Underground, Google Maps',
                techs: 'AngularJS, ExpressJS, NodeJS, Kendo UI, Bootstrap, MomentJS, Raphael',
                members: 3
            }
		};
        $scope.openGallery = function(which) {
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
            console.log('event', url);
            $window.open(url, '_blank');
        };


        $http({
            method: 'GET',
            url: '/mygithub'
        }).then(function successCallback (response) {
            console.log('github info', response);
            var rLen = response.data.length;
            for (var i = 0; i < rLen; i++) {
                var tooltipString = 'Language: ' + (response.data[i].language ? response.data[i].language : 'Unknown') + ' / Last Updated: ' +
                        moment(response.data[i].updated_at).format('MM/DD/YYYY hh:mm a'),
                    template = $compile('<md-button ng-click="openGhProject(\'' + response.data[i].html_url + '\')" class="op-entry">' +
                    '<span>' + response.data[i].name + '</span><md-tooltip style="color: black; font-size: 1.1em;">' + tooltipString +
                    '</md-tooltip></md-button>')($scope);
                angular.element(document.querySelector('.op-area')).append(template);
            }
        }, function errorCallback (response) {
            console.log('github info', response);
        });
	}
]);

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

'use strict';

angular.module('core').directive('fadeIn', [
	function() {
		return {
			restrict: 'A',
			link: function($scope, $element, attrs){
				$element.addClass("ng-hide-remove");
				$element.bind('load', function() {
					$element.addClass("ng-hide-add");
				});
			}
		};
	}
]);

'use strict';

angular.module('core').directive('modalgallery', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {


				element.text('this is the modalgallery directive');
			}
		};
	}
]);

'use strict';
/*global moment: false */

angular.module('core').factory('Geolocateme', ['$rootScope',
	function($rootScope) {
		return {
			setLocationVar: function() {
				function getLocation(location) {
				    	$rootScope.currentLocale = {'latitude': location.coords.latitude, 'longitude': location.coords.longitude, 'accuracy': location.coords.accuracy, 'error': 'none'};
						$rootScope.$broadcast('locationIsSet');
						sessionStorage.setItem('geoLocation', JSON.stringify($rootScope.currentLocale));
				}

				function localeDenied(error) {
				    console.log('error', error);
				    $rootScope.currentLocale = {'latitude': 'error', 'longitude': 'error', 'accuracy': 'error', 'error': error};
				    $rootScope.$broadcast('locationDenied');
				}

				if (navigator.geolocation ) {
					navigator.geolocation.getCurrentPosition(getLocation, localeDenied);
				} else {
					$rootScope.currentLocale = {'latitude': 'not supported', 'longitude': 'not supported', 'accuracy': 'not supported', 'error': 'not supported'};
					$rootScope.$broadcast('locationNotPossible');
				}
			}
		};
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';
/*jshint camelcase: false */
/*global moment: false */

angular.module('core').service('Weather', ['$q', '$http',
	function($q, $http) {
		var nowTimestamp = moment().unix(),
			cachedConditions = null,
			conditionsTimestamp = null,
			cachedForecast = null,
			forecastTimestamp = null;
		return {
			getConditions: function(locale) {
				console.log('hit weather service');
				var def = $q.defer();
				nowTimestamp = moment().unix();
				conditionsTimestamp = parseInt(sessionStorage.getItem(locale.toString() + 'weatherTimestamp'));
				// cachedConditions = sessionStorage.getItem(locale.toString() + 'conditions') ? JSON.parse(sessionStorage.getItem(locale.toString() + 'conditions')) : null;
				if(!cachedConditions || nowTimestamp - conditionsTimestamp >= 900) { // get on first call then get again if cached for more that 15 minutes
					$http.get('/conditions/' + locale)
					.success(function(data, status, headers, config) {
						console.log(data);
						sessionStorage.setItem(locale.toString() + 'weatherTimestamp', moment().unix().toString());
						sessionStorage.setItem(locale.toString() + 'conditions', JSON.stringify(data.current_observation));
				        def.resolve(data.current_observation);
					}).error(function(data, status, headers, config) {
						if(data === null && cachedConditions) {
							def.resolve(cachedConditions);
						} else {
							console.log('unable to fetch weather ', status);
							def.reject(status);
						}                  
					});
					return def.promise;
				} else {
					def.resolve(cachedConditions);
					return def.promise;
				}
			}
			// getForecast: function(locale) {
			// 	var def = $q.defer();
			// 	nowTimestamp = moment().unix();
			// 	forecastTimestamp = parseInt(sessionStorage.getItem(locale.toString() + 'forecastTimestamp'));
			// 	cachedForecast = sessionStorage.getItem(locale.toString() + 'forecast') ? JSON.parse(sessionStorage.getItem(locale.toString() + 'forecast')) : null;
			// 	if(!cachedForecast || nowTimestamp - forecastTimestamp >= 900) { // get on first call then get again if cached for more that 15 minutes
			// 		$http.get(weatherURL + 'forecast/q/' + locale + '.json')
			// 		.success(function(data, status, headers, config) {
			// 			sessionStorage.setItem(locale.toString() + 'forecast', JSON.stringify(data.forecast.simpleforecast));
			// 			sessionStorage.setItem(locale.toString() + 'forecastTimestamp', moment().unix().toString());
			// 			def.resolve(data.forecast.simpleforecast);
			// 		}).error(function(data, status, headers, config) {
			// 			if(data === null && cachedForecast) {
			// 				def.resolve(cachedForecast);
			// 			} else {
			// 				console.log('unable to fetch weather ', status);
			// 				def.reject(status);
			// 			}
			// 		});
			// 		return def.promise;
			// 	} else {
			// 		def.resolve(cachedForecast);
			// 		return def.promise;
			// 	}
			// }
		};
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);