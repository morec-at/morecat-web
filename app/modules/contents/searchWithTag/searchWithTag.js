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

searchWithTag.controller('searchWithTagCtrl', ['$rootScope', '$scope', '$routeParams', '$http', '$sce', 'tags', 'DateFormat',
                         function($rootScope, $scope, $routeParams, $http, $sce, tags, DateFormat) {

  $scope.tag = $routeParams.tag;
  $http.get($rootScope.apiUrl + '/entries/tags/' + $routeParams.tag).success(function(entryPageByTag) {
    var entries = entryPageByTag.elements;
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.url = '/blog/' + DateFormat.format(new Date(entry.createdDate), 'YYYY/MM/DD/') + entry.permalink;
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
