'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl'
    });

}]);

blog.controller('BlogCtrl', function($scope) {
  $scope.entries = [
    {'title': 'Title1',
      'content': '<p>Content1</p>'},
    {'title': 'Title2',
      'content': '<p>Content2</p>'},
    {'title': 'Title3',
      'content': '<p>Content3</p>'}
  ];
});