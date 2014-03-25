'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/view1', {
        templateUrl: '/app/partials/partial1.html',
        controller: 'MyCtrl1'
      })
      .when('/view2', {
        templateUrl: '/app/partials/partial2.html',
        controller: 'MyCtrl2'})
      .otherwise({
        redirectTo: '/view1'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);