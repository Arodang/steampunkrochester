(function () {
	"use strict";
	var app = angular.module("steampunkRochester", []);

	var nameGenController = app.controller("nameGenController", ["$scope", "nameGenService", function ($scope, nameGenService) {
	    $scope.testdata = "Hello world!"
	    nameGenService.getLastNames();
	}]);

	var nameGenService = app.factory("nameGenService", ["$http", function ($http) {
	    var getLastNames = function () {
	        $http.get('sources/lastNames.txt').success(function (data) {
	            console.log("test!");
	            console.log(data);
	        });
	    }


	    return {
	        getLastNames: getLastNames
	    };
	    
	    
	}]);
	
})();
