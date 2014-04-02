'use strict';

var entry = angular.module('entry', ['hljs']);

entry.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/:year/:month/:day/:permalink', {
      templateUrl: 'assets/partials/contents/entry/entryTmpl.html',
      controller: 'EntryCtrl'
    });

}]);

entry.controller('EntryCtrl', ['$scope', '$routeParams', '$http', '$sce', function($scope, $routeParams, $http, $sce) {
  $http.get('http://localhost:8080/morecat/api/entries/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.permalink).success(function(entry) {
    $scope.entry = entry;
    $scope.html = entry.content;
    $scope.trustedHtml = $sce.trustAsHtml($scope.html);
  });
}]);