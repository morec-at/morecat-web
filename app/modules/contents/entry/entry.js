'use strict';

var entry = angular.module('entry', []);

entry.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/:year/:month/:day/:permalink', {
      templateUrl: 'assets/partials/contents/entry/entryTmpl.html',
      controller: 'EntryCtrl'
    });

}]);

entry.controller('EntryCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http.get('http://localhost:8080/morecat/api/entries/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.permalink).success(function(entry) {
    $scope.entry = entry;
  });
}]);