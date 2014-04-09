'use strict';

var searchWithTag = angular.module('searchWithTag', []);

searchWithTag.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/tags/:tag', {
      templateUrl: 'assets/partials/contents/searchWithTag/searchWithTagTmpl.html',
      controller: 'searchWithTagCtrl'
    });

}]);

searchWithTag.controller('searchWithTagCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.tag = $routeParams.tag;
  $http.get('http://localhost:8080/morecat/api/entries/tags/' + $routeParams.tag).success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
    });
  });
  $http.get('http://localhost:8080/morecat/api/entries/tags').success(function(tags) {
    $scope.tags = tags;
  });
}]);