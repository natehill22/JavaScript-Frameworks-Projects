//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Creates a new Angular module named githubViewer with routing set up
  var app = angular.module("githubViewer", ["ngRoute"]);

    //Configures routes to be used (URLs, templates to be shown, controllers to determine what logic to used)
    app.config(function($routeProvider) {
      $routeProvider
        .when("/main", {
          templateUrl: "main.html",
          controller: "MainCtrl"
        })
        .when("/user/:username", {
          templateUrl: "user.html",
          controller: "UserCtrl"
        })
        .otherwise({redirectTo:"/main"}); //If undocumented URL is given, redirect to the main page
    });

}());