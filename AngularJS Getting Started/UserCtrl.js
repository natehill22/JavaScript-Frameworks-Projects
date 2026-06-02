//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Refernces an existing Angular module named githubViewer with no dependencies, controller is called MainCtrl
  var app = angular.module("githubViewer");

    var UserCtrl = function($scope, github, $routeParams) {

        var onUserComplete = function(data) {
        $scope.user = data; //Connects JS and HTML to display user data within the view
        //Makes asynchronous request to github through a custom service to access a user's repo data
        github.getRepos($scope.user).then(onRepos, onError); //Runs the service once data has loaded
        };

        var onRepos = function(data) {
        $scope.repos = data; //Connects JS and HTML to display repo data within the view
        };

        var onError = function(reason) {
        $scope.error = "Could not fetch the data."; //Displays custom error to the view, if triggered
        };

        $scope.username = $routeParams.username; //Grabs username from the URL data to use within view/search 
        $scope.repoSortOrder = "-stargazers_count"; //Stores default sort order in scope to show within view (most-to-least stargazer count) 
        github.getUser($scope.username).then(onUserComplete, onError); //Runs the getUser service once data has loaded
    };

    app.controller("UserCtrl", UserCtrl); //Defines controller name

}());