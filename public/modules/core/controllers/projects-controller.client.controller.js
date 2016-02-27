'use strict';
/* globals moment */

angular.module('core').controller('ProjectsControllerController', ['$scope', '$mdDialog', '$timeout', '$http', '$compile', '$window',
	function($scope, $mdDialog, $timeout, $http, $compile, $window) {
        // TODO: make modals more responsive an look better
        var projectVm = this;
		projectVm.radios = 'sidePro';
		projectVm.proj = {
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
                description: 'This application was built by request for the Texas Lassos Alumni Group. I worked on a team with two other developers' +
                ' to create a private social network for the group. The app has a table for all alums and a table for alums who have joined the' +
                ' network. Upon signing up, the app notifies the admins, tells the user they must wait for approval, and ' +
                'looks for the user in the alum table to see if it can move their info to the active user table. After approval' +
                ' the user is notified to log in and can edit their profile and use the app. Admins can import and export user info via Excel sheets.',
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
            $window.open(url, '_blank');
        };


        $http({
            method: 'GET',
            url: '/mygithub'
        }).then(function successCallback (response) {
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
