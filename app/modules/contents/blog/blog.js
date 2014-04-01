'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl'
    });

}]);

blog.controller('BlogCtrl', function($scope, $http) {
  $http.get('http://localhost:8080/morecat/api/entries/').success(function(entries) {
    $scope.entries = entries;
  });
});