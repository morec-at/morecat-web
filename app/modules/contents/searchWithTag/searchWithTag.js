'use strict';

var searchWithTag = angular.module('searchWithTag', []);

searchWithTag.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog/tags/:tag', {
      templateUrl: 'assets/partials/contents/searchWithTag/searchWithTagTmpl.html',
      controller: 'searchWithTagCtrl',
      resolve: {
        tags: ['Tags', function(Tags) {
          return Tags.getAll();
        }]
      }
    });

}]);

searchWithTag.controller('searchWithTagCtrl', ['$rootScope', '$scope', '$routeParams', '$http', '$sce', 'tags', 'configuration',
                         function($rootScope, $scope, $routeParams, $http, $sce, tags, configuration) {

  $scope.tag = $routeParams.tag;
  $http.get(configuration.apiUrl + '/entries/tags/' + $routeParams.tag).success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/blog/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });
  });

  $rootScope.title = $routeParams.tag + ' - MoreCat Web';

  $scope.tags = tags;

}]);
