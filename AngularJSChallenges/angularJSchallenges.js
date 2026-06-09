//Wraps the whole module in an IIFE to eliminate global variables
(function() {

  //Creates a new Angular module named newApp with no dependencies
  var app = angular.module("newApp", []);

    var MainCtrl = function($scope) {

      //Defines a 'person' object to show within the view
      var person = {
        firstName: "Mr.",
        lastName: "Smooth",
        imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-eKVUMRlUiOk8D2fAX5FVUSUnpvhK3HBfQ&s"
      };

      $scope.title = "This shows ng-bind attribute message."; //Stores message in scope to show within view 
      $scope.person = person; //Stores person data in scope to show within view 
      $scope.fruits = ["Lychee", "Tamarind", "Starfruit", "Papaya", "Mango", "Kiwi"];

    };

    app.controller("MainCtrl", MainCtrl); //Defines controller name


}());