'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html'
    });

}]);