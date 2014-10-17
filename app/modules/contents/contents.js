'use strict';

var contents = angular.module('contents', ['ngRoute', 'home', 'about', 'products', 'blog', 'entry', 'searchWithTag', 'tagServices', 'dateFormatService']);

contents.config(['$locationProvider', function config($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);