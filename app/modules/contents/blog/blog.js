'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl'
    });

}]);

blog.controller('BlogCtrl', function($scope, $http) {
  $http.get('http://localhost:8080/morecat/api/entries/').success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getUTCFullYear();
      entry.month = new Date(entry.createdDate).getUTCMonth() + 1;
      entry.day = new Date(entry.createdDate).getUTCDate();
    });
  });
  $http.get('http://localhost:8080/morecat/api/entries/tags').success(function(tags) {
    $scope.tags = tags;
  });
});