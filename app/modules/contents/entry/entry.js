'use strict';

var entry = angular.module('entry', []);

entry.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/:year/:month/:day/:permalink', {
      templateUrl: 'assets/partials/contents/entry/entryTmpl.html',
      controller: 'EntryCtrl'
    });

}]);

entry.controller('EntryCtrl', ['$rootScope', '$scope', '$routeParams', '$http', '$sce', 'configuration',
                 function($rootScope, $scope, $routeParams, $http, $sce, configuration) {

  $http.get(configuration.apiUrl + '/entries/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.permalink).success(function(entry) {
    $scope.entry = entry;
    $scope.entry.year = new Date(entry.createdDate).getFullYear();
    $scope.entry.month = new Date(entry.createdDate).getMonth() + 1;
    $scope.entry.day = new Date(entry.createdDate).getDate();
    $scope.trustedContent = $sce.trustAsHtml(entry.content);
    var inlineTags = '';
    _.each(entry.tags, function(tag) {
      inlineTags += '[<a href="/blog/tags/' + tag + '">';
      inlineTags += tag;
      inlineTags += '</a>]';
    });
    entry.inlineTags = $sce.trustAsHtml(inlineTags);
    $rootScope.title = entry.title + ' - MoreCat Web';
  });

}]);
