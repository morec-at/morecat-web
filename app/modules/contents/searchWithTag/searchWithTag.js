'use strict';

var searchWithTag = angular.module('searchWithTag', []);

searchWithTag.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog/tags/:tag', {
      templateUrl: 'assets/partials/contents/searchWithTag/searchWithTagTmpl.html',
      controller: 'searchWithTagCtrl',
      resolve: {
        page: ['Entry', '$route', function(Entry, $route) {
          return Entry.getPageByTag($route.current.params.tag, 0, 5);
        }],
        tags: ['Tags', function(Tags) {
          return Tags.getAll();
        }]
      }
    });

}]);

searchWithTag.controller('searchWithTagCtrl', ['$rootScope', '$scope', '$routeParams', '$http', 'page', 'tags', 'Entry',
                         function($rootScope, $scope, $routeParams, $http, page, tags, Entry) {

  $scope.tag = $routeParams.tag;
  var entryPageByTag = page;
  $scope.entries = entryPageByTag.elements;
  $scope.totalItems = entryPageByTag.totalNumberOfElements;
  $scope.currentPage = entryPageByTag.page + 1;
  $scope.itemsPerPage = entryPageByTag.size;
  $scope.maxSize = 5;

  $scope.pageChanged = function() {
    // TODO Use Entry.getPageByTag($scope.currentPage - 1, 5)
    $http.get($rootScope.apiUrl + '/entries/tags/' + $routeParams.tag + '?page=' + (parseInt($scope.currentPage) - 1)).success(function(entryPageByTag) {
     $scope.entries = Entry.setUpEntries(entryPageByTag.elements);
    });
  };

  $rootScope.title = $routeParams.tag + ' - ' + $rootScope.blogName;
  $scope.tags = tags;

}]);
