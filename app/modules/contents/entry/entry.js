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

entry.controller('EntryCtrl', ['$rootScope', '$scope', '$window', 'entry', 'DateFormat',
                 function($rootScope, $scope, $window, entry, DateFormat) {

  $scope.entry = entry.element;
  $scope.content = entry.element.content;

  if (entry.next) {
    $scope.nextTitle = entry.next.title;
    $scope.nextUrl = '/blog/' + DateFormat.format(new Date(entry.next.createdDate), 'YYYY/MM/DD/') + entry.next.permalink;
    $scope.isShowNext = true;
  }
  if (entry.previous) {
    $scope.previousTitle = entry.previous.title;
    $scope.previousUrl = '/blog/' + DateFormat.format(new Date(entry.previous.createdDate), 'YYYY/MM/DD/') + entry.previous.permalink;
    $scope.isShowPrevious = true;
  }

  $rootScope.title = entry.element.title + ' - ' + $rootScope.blogName;
  $rootScope.activeTab = 'blog';

  $window.scrollTo(0, 0);
}]);
