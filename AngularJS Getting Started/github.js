//import angular from 'angular'; //Imports AngularJS library

//Creates a new Angular module named Plunker with no dependencies, controller is called MainCtrl
angular.module('plunker', []).controller('MainCtrl', function($scope) {
  $scope.name = 'Plunker'; //Connects JS and HTML to display .name in the view
});

//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Creates a custom service that depends on the existing $http service
  var github = function($http) {

    var getUser = function(username) {
      //Returns a promise due to the asynchronous nature of the function
      return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                  return response.data; //Returns a .then on the promise 
                });
    };

    var getRepos = function(user) {
      //Returns a promise due to the asynchronous nature of the function
      return $http.get(user.repos_url)
                  .then(function(response) {
                    return response.data; //Returns a .then on the promise 
                  });
    };

    var getRepoDetails = function(username, reponame) {
      var repo;
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;

      //Returns a chained promise due to the asynchronous nature of the function
      return $http.get(repoUrl)
                  .then(function(response) { //Gets repo's details
                      repo = response.data;
                      return $http.get(repoUrl + "/contributors");
                  })
                  .then(function(response) { //Gets contributors details
                    repo.contributors = response.data;
                    return repo;
                  }); //Data returned will be a list of the selected reponame's contributors 
    };

    return {
      //Picks the public APIs
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };

  };
  
  //Creates a reference to an existing Angular module named githubViewer
  var module = angular.module("githubViewer");
  module.factory("github", github); //Registers the service with Angular (points to a function that returns an object with the APIs above)

}());