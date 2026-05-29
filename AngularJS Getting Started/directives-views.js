//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Creates a new Angular module named githubViewer with no dependencies, controller is called MainCtrl
  var app = angular.module("githubViewer", []);

    var MainCtrl = function($scope, $http) {

        var onUserComplete = function(response) {
        $scope.user = response.data; //Connects JS and HTML to display user data within the view
        //Makes asynchronous request to github to access a users repo data
        $http.get($scope.user.repos_url)
                .then(onRepos, onError); //Then method runs the callback functions once data has loaded
        };

        var onRepos = function(response) {
        $scope.repos = response.data; //Connects JS and HTML to display repo data within the view
        };

        var onError = function(reason) {
        $scope.error = "Could not fetch the data."; //Displays custom error to the view, if triggered
        };

        //Searches github for matching usernames and returns their specific data
        $scope.search = function(username) {
        //Makes asynchronous request to github to access a users data
        $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError); //Then method runs the callback functions once data has loaded
        };

        $scope.username = "angular"; //Stores username data in scope to show within view 
        $scope.message = "Github Viewer"; //Stores message in scope to show within view 
        $scope.repoSortOrder = "-stargazers_count"; //Stores default sort order in scope to show within view (most-to-least stargazer count) 

    };

    app.controller("MainCtrl", ["$scope", "$http", MainCtrl]); //Defines controller name and protects it from errors during minification

}());