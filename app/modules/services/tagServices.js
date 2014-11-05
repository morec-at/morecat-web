'use strict';

var tagServices = angular.module('tagServices', []);

tagServices.factory('Tags', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
  function getAll() {
    return  $http.get($rootScope.apiUrl + '/entries/tags').then(function(tags) {
      return tags.data;
    });
  }
  return {
    getAll: getAll
  };
}]);