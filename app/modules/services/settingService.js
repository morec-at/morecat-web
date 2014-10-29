'use strict';

var settingService = angular.module('settingService', []);

settingService.factory('Setting', ['$rootScope', '$http' , function($rootScope, $http) {
  function getBlogDescription() {
    return  $http.get($rootScope.apiUrl + '/settings/blog-description').then(function(blogDescription) {
      return blogDescription.data;
    });
  }
  return {
    getBlogDescription: getBlogDescription
  };
}]);