'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl',
      resolve: {
        page: ['Entry', function(Entry) {
          return Entry.getPage(0, 5);
        }],
        tags: ['Tags', function(Tags) {
          return Tags.getAll();
        }]
      }
    });

}]);

blog.controller('BlogCtrl', ['$rootScope', '$scope', '$http', 'page', 'tags', 'Entry',
                function($rootScope, $scope, $http, page, tags, Entry) {

  var entryPage = page;
  $scope.entries = entryPage.elements;
  $scope.totalItems = entryPage.totalNumberOfElements;
  $scope.currentPage = entryPage.page + 1;
  $scope.itemsPerPage = entryPage.size;
  $scope.maxSize = 5;

  $scope.pageChanged = function() {
    // TODO Use Entry.getPage($scope.currentPage - 1, 5)
    $http.get($rootScope.apiUrl + '/entries?page=' + (parseInt($scope.currentPage) - 1)).success(function(entryPage) {
      $scope.entries = Entry.setUpEntries(entryPage.elements);
    });
  };

  $rootScope.title = 'Blog - ' + $rootScope.blogName;
  $scope.tags = tags;

}]);
