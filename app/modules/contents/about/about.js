'use strict';

var about = angular.module('about', []);

about.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/about', {
      templateUrl: 'assets/partials/contents/about/aboutTmpl.html',
      controller: 'AboutCtrl'
    });

}]);

about.controller('AboutCtrl', ['$rootScope', function($rootScope) {
  $rootScope.title = 'About - ' + $rootScope.blogName;
}]);