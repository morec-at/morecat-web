'use strict';

var home = angular.module('home', []);

home.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/home/homeTmpl.html'
    });

}]);