'use strict';

var contents = angular.module('contents',
  ['ngRoute', 'home', 'about', 'products', 'blog', 'entry', 'searchWithTag',
    'entryService', 'tagServices', 'settingService', 'dateFormatService', 'ui.bootstrap']);

contents.config(['$locationProvider', function config($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);