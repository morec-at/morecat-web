'use strict';

var entry = angular.module('entry', []);

entry.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog/:year/:month/:day/:permalink', {
      templateUrl: 'assets/partials/contents/entry/entryTmpl.html',
      controller: 'EntryCtrl',
      resolve: {
        entry: ['Entry', '$route', function(Entry, $route) {
          return Entry.getEntry($route.current.params.year,
                                $route.current.params.month,
                                $route.current.params.day,
                                $route.current.params.permalink);
        }]
      }
    });

}]);

entry.controller('EntryCtrl', ['$rootScope', '$scope', 'entry',
                 function($rootScope, $scope, entry) {

  $scope.entry = entry;
  $scope.content = entry.content;
  $rootScope.title = entry.title + ' - ' + $rootScope.blogName;

}]);
