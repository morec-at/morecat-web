'use strict';

var searchWithTag = angular.module('searchWithTag', []);

searchWithTag.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/tags/:tag', {
      templateUrl: 'assets/partials/contents/searchWithTag/searchWithTagTmpl.html',
      controller: 'searchWithTagCtrl'
    });

}]);

searchWithTag.controller('searchWithTagCtrl', ['$scope', '$routeParams', '$http', '$sce', function($scope, $routeParams, $http, $sce) {
  $scope.tag = $routeParams.tag;
  $http.get('http://localhost:8080/morecat/api/entries/tags/' + $routeParams.tag).success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });
  });
  $http.get('http://localhost:8080/morecat/api/entries/tags').success(function(tags) {
    $scope.tags = tags;
  });
}]);