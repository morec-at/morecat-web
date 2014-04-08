'use strict';

var home = angular.module('home', []);

home.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/home/homeTmpl.html',
      controller: 'homeCtrl'
    });

}]);

home.controller('homeCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  $http.get('http://localhost:8080/morecat/api/entries/').success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getUTCFullYear();
      entry.month = new Date(entry.createdDate).getUTCMonth() + 1;
      entry.day = new Date(entry.createdDate).getUTCDate();
      entry.content = $sce.trustAsHtml(entry.content);
    });
  });
}]);