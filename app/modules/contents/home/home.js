'use strict';

var home = angular.module('home', []);

home.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/home/homeTmpl.html',
      controller: 'HomeCtrl',
      resolve: {
        recent: ['Entry', function(Entry) {
          return Entry.getRecent();
        }],
        blogDescription: ['Setting', function(Setting) {
          return Setting.getBlogDescription();
        }]
      }
    });

}]);

home.controller('HomeCtrl', ['$rootScope', '$scope', 'recent', 'blogDescription',
                function($rootScope, $scope, recent, blogDescription) {

  $scope.entries = recent.elements;
  $scope.blogDescription = blogDescription;
  $rootScope.title = $rootScope.blogName;
  $rootScope.activeTab = 'home';
}]);
