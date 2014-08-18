'use strict';

var searchWithTag = angular.module('searchWithTag', []);

searchWithTag.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/tags/:tag', {
      templateUrl: 'assets/partials/contents/searchWithTag/searchWithTagTmpl.html',
      controller: 'searchWithTagCtrl'
    });

}]);

searchWithTag.controller('searchWithTagCtrl', ['$rootScope', '$scope', '$routeParams', '$http', '$sce', function($rootScope, $scope, $routeParams, $http, $sce) {
  $scope.tag = $routeParams.tag;
  $http.get('http://morecat.emamotor.org/api/entries/tags/' + $routeParams.tag).success(function(entries) {
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
      $rootScope.title = 'Search With Tags - MoreCat Web';
    });
  });
  $http.get('http://morecat.emamotor.org/api/entries/tags').success(function(tags) {
    $scope.tags = tags;
  });
}]);
