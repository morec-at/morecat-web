'use strict';

var tagServices = angular.module('tagServices', []);

tagServices.factory('Tags', ['$http', '$q', 'configuration', function($http, $q, configuration) {
  function getAll() {
    return  $http.get(configuration.apiUrl + '/entries/tags').then(function(tags) {
      return tags.data;
    });
  }
  return {
    getAll: getAll
  };
}]);