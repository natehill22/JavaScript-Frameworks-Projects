//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Refernces an existing Angular module named githubViewer with no dependencies, controller is called MainCtrl
  var app = angular.module("githubViewer");

    var MainCtrl = function($scope, $interval, $location) {

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
            if(countdownInterval) {
                $interval.cancel(countdownInterval); //Cancels countdownInterval if search is run and interval is still existant
                $scope.countdown = null; //Clears the countdown to clear the numbers off the screen
            }
            $location.path("/user/" + username); //Takes end-user to the URL /user/{username they searched for} 
        };

        $scope.username = "angular"; //Stores username data in scope to show within view 
        $scope.countdown = 5; //Sets countdown to 5, so that it will always count down from that value 
        startCountdown(); //Automatically runs the startCountdown method upon controller load

    };

    app.controller("MainCtrl", MainCtrl); //Defines controller name

}());