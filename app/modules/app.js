'use strict';

var morecatweb = angular.module('morecatweb', ['ngRoute']);

morecatweb.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/about', {
      templateUrl: 'partials/about.html'
    })
    .when('/posts', {
      templateUrl: 'partials/posts.html'
    });

}]);