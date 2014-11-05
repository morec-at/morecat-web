'use strict';

var configuration = angular.module('configuration', []);

configuration.run(['$http', '$rootScope', function($http, $rootScope) {
  $rootScope.apiUrl = '@apiUrl@';
  $http.get($rootScope.apiUrl + '/settings/blog-name').success(function(blogName) {
    $rootScope.blogName = blogName;
  });
}]);

