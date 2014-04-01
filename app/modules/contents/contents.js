'use strict';

var contents = angular.module('contents', ['ngRoute', 'about', 'blog']);

contents.config(['$locationProvider', function config($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);