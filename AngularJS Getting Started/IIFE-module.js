//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

var createWorker = function() {

  var workCount = 0;

  //Revealing module pattern, will print text and increment workCount with each call
  var task1 = function() {
    workCount += 1;
    console.log("task1 " + workCount);
  };

  var task2 = function() {
    workCount += 1;
    console.log("task2 " + workCount);
  };

  return {
    job1: task1, //Job1 points to task1 
    job2: task2 //Job2 points to task2 
  };
};

var worker = createWorker();

worker.job1();
worker.job2();
worker.job2();
worker.job2();
}());