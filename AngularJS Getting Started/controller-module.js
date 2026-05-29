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
      };

      var onError = function(reason) {
        $scope.error = "Could not fetch the user"; //Connects JS and HTML to display custom error message (should it occur)
      };

      //Makes asynchronous request to github to access a users data
      $http.get("https://api.github.com/users/gvanrossum")
        .then(onUserComplete, onError); //Then method calling the callback functions above once data has been loaded

      //Defines a 'person' object to show within the view
      var person = {
        firstName: "Python",
        lastName: "King",
        imageSrc: "https://m.media-amazon.com/images/M/MV5BYWVjZDQzNjktM2UzMS00YTQ2LThmMTUtZGM0OWE0ZmZmZTFkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
      };

      $scope.message = "Hello Angular!"; //Stores message in scope to show within view 
      $scope.person = person; //Stores person data in scope to show within view 

    };

    app.controller("MainCtrl", ["$scope", "$http", MainCtrl]); //Defines controller name and protects it from errors during minification

}());