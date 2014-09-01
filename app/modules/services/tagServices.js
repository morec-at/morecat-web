'use strict';

var tagServices = angular.module('tagServices', []);

tagServices.factory('Tags', ['$http', '$q', function($http, $q) {
  function getAll() {
    return  $http.get('http://morecat.emamotor.org/api/entries/tags').then(function(tags) {
      return tags.data;
    });
  }
  return {
    getAll: getAll
  };
}]);