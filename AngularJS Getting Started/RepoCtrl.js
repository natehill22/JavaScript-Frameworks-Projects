//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Refernces an existing Angular module named githubViewer with no dependencies, controller is called MainCtrl
  var app = angular.module("githubViewer");

    var RepoCtrl = function($scope, github, $routeParams) {

        var onRepo = function(data) {
        $scope.repo = data; //Connects JS and HTML to display repo data within the view
        };

        var onError = function(reason) {
        $scope.error = reason; //Displays error to the view, if triggered
        };

        var reponame = $routeParams.reponame; //Grabs reponame from the URL data to use within view/search 
        var username = $routeParams.username; //Grabs username from the URL data to use within view/search 

        github.getRepoDetails(username, reponame) 
                .then(onRepo, onError) //Runs the getRepoDetails service once data has loaded
    };

    app.controller("RepoCtrl", RepoCtrl); //Defines controller name

}());