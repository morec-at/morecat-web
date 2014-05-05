'use strict';

var home = angular.module('home', []);

home.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/home/homeTmpl.html',
      controller: 'HomeCtrl'
    });

}]);

home.controller('HomeCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  $http.get('http://localhost:8080/morecat/api/entries/').success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
      entry.content = $sce.trustAsHtml(entry.content);
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });
  });
}]);