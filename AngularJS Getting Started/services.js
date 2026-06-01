//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Creates a new Angular module named githubViewer with no dependencies, controller is called MainCtrl
  var app = angular.module("githubViewer", []);

    var MainCtrl = function($scope, github, $interval, $log, $anchorScroll, $location) {

        var onUserComplete = function(data) {
        $scope.user = data; //Connects JS and HTML to display user data within the view
        //Makes asynchronous request to github through a custom service to access a user's repo data
        github.getRepos($scope.user).then(onRepos, onError); //Runs the service once data has loaded
        };

        var onRepos = function(data) {
        $scope.repos = data; //Connects JS and HTML to display repo data within the view
        $location.hash("userDetails"); //Sets the fragment identifier (for the URL) to find UI section with userDetails ID
        $anchorScroll(); //Scrolls down to that section automatically
        };

        var onError = function(reason) {
        $scope.error = "Could not fetch the data."; //Displays custom error to the view, if triggered
        };

        var decrementCountdown = function() {
            $scope.countdown -= 1; //Decrement by 1 (this should run every second)
            if($scope.countdown < 1) {
                $scope.search($scope.username); //If countdown reaches 0, automatically run search method with current username
            }
        };

        var countdownInterval = null; //Clearing countdownInterval
        var startCountdown = function() {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown); //Sets interval to run method every second as many times as there are numbers in countdown
        }

        //Searches github for matching usernames and returns their specific data
        $scope.search = function(username) {
            $log.info("Searching for " + username); //Prints this phrase to the console to let us know how many times the method is running
            //Makes asynchronous request to github through a service to access a user's data
            github.getUser(username).then(onUserComplete, onError); //Runs the service once data has loaded
            if(countdownInterval) {
                $interval.cancel(countdownInterval); //Cancels countdownInterval if search is run and interval is still existant
                $scope.countdown = null; //Clears the countdown to clear the numbers off the screen
            }
        };

        $scope.username = "angular"; //Stores username data in scope to show within view 
        $scope.message = "Github Viewer"; //Stores message in scope to show within view 
        $scope.repoSortOrder = "-stargazers_count"; //Stores default sort order in scope to show within view (most-to-least stargazer count) 
        $scope.countdown = 5; //Sets countdown to 5, so that it will always count down from that value 
        startCountdown(); //Automatically runs the startCountdown method upon controller load

    };

    app.controller("MainCtrl", MainCtrl); //Defines controller name

}());