'use strict';

var about = angular.module('about', []);

about.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/about', {
      templateUrl: 'assets/partials/contents/about/aboutTmpl.html'
    });

}]);