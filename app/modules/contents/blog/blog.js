'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl'
    });

}]);

blog.controller('BlogCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://localhost:8080/morecat/api/entries/').success(function(entries) {
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
    });
    var years = _.groupBy(entries, function(entry) {
      return new Date(entry.createdDate).getFullYear();
    });
    years = _.each(years, function(year, key) {
      year.year = key;
    });
    $scope.years = _.sortBy(years, function(year, key) {
      return -key;
    });
  });
  $http.get('http://localhost:8080/morecat/api/entries/tags').success(function(tags) {
    $scope.tags = tags;
  });
}]);