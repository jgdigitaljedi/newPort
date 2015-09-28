'use strict';

angular.module('core').controller('ProjectsControllerController', ['$scope', '$mdDialog', '$timeout',
	function($scope, $mdDialog, $timeout) {
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
                ' to create a privatized social network for this Alumni group. The application has a table for alums and a table for alums who have joined the social' +
                ' network. Upon signing up, the app notifies the admins that someone is pending approval, notifies the user they must wait for approval, and ' +
                'looks for the user information in the alum table to see if it can move it to the active user table but still keep them inactive. After approval' +
                ' the user is notified to log in and can fill out their profile, search for other alums, and more. Admins can import new alums via Excel sheet' +
                ' and export the whole database to an Excel sheet as well. This was a Ruby on Rails app with Devise and Roo gems and a little bit of jQuery.',
                link: 'http://connect.lassoalumni.org/users/sign_in',
                github: 'https://github.com/jgdigitaljedi/tx-lassos',
                techs: 'Ruby on Rails, Devise gem, Roo gem, jQuery',
                apis: 'Bootstrap'
            },
            rr: {
                title: 'Restaurant Roulette',
                images: ['../../assets/images/rr/rr-gallery-1.png', '../../assets/images/rr/rr-gallery-2.png', '../../assets/images/rr/rr-gallery-3.png', '../../assets/images/rr/rr-gallery-4.png',
                    '../../assets/images/rr/rr-gallery-5.png', '../../assets/images/rr/rr-gallery-6.png', ],
                description: 'This app was done in 2 days and AngularJS was used merely to force myself to learn it on the fly. It geolocates you via IP address,' +
                ' gets a list of 30 restaurants near you via the FourSquare API, then randomly selects 2 choices for you providing you with a website link and ' +
                'Google map for each one.',
                link: 'http://development.restaurant-roulette.divshot.io/',
                github: 'https://github.com/jgdigitaljedi/hackday/tree/gh-pages',
                techs: ''
            },
            toolbox: {
                title: 'Toolbox',
                images: [],
                description: 'After writing a countless number of vbscripts and batch files to perform remote and batch tasks, I finally decided to write an' +
                ' HTA to give the script collection a GUI and make it easier for anyone to use my scripts. Although a lot of features had to be removed prior' +
                ' to posting to GitHub because they contained server addresses or were for very client specific tasks, the project is still huge and loaded with' +
                ' functionality. I used vbscript, JavaScript, HTML, and CSS to generate an HTA that has many external vbscript and batch file dependencies. This ' +
                'is a Windows desktop app made to function inside a Windows network.',
                link: false,
                github: 'https://github.com/jgdigitaljedi/myToolBox',
                techs: ''
            },
            portfolio: {
                title: 'Portfolio',
                images: [],
                description: 'Well, this is the page you\'re looking at right now. Why list it as a project?',
                link: 'You\'re already there!',
                github: 'https://github.com/jgdigitaljedi/newPort',
                techs: 'MongoDB, ExpressJS, AngularJS, NodeJS, Angular Material, MomentJS'
            },
            host: {
                title: 'Host Reports',
                description: '',
                techs: 'Bootstrap, jQuery, Bootstrap Tables, MomentJS'
            },
            roms: {
                title: 'WebROMS',
                description: '',
                techs: 'AngularJS, ExpressJS, NodeJS, Kendo UI, Bootstrap, MomentJS, '
            },
            elcc: {
                title: 'ELCC',
                description: '',
                techs: ''
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

                    $scope.closeGallery = function() {
                        angular.element(document.body).addClass('no-scroll');
                        $mdDialog.cancel();
                        $timeout(function() {
                            angular.element(document.body).removeClass('no-scroll');
                        }, 750);
                        //angular.element(document.body).css('overflow', 'auto');
                    };

                    $scope.changePic = function(e, picPath) {
                        angular.element(thumbs).removeClass('selected-thumb');
                        angular.element(e.target).addClass('selected-thumb');
                        angular.element(document.querySelector('.big-pic')).removeClass('fade-in');
                        $timeout(function() {
                            angular.element(document.querySelector('.big-pic')).addClass('fade-in');
                        }, 30);
                        $scope.selectedPic = picPath;
                    };
                },
                templateUrl: '/modules/core/views/modals/projects.gallery.dash.template.html',
                parent: angular.element(document.body)
            });
        };
	}
]);
