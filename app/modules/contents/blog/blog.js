'use strict';

var blog = angular.module('blog', []);

blog.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/blog', {
      templateUrl: 'assets/partials/contents/blog/blogTmpl.html',
      controller: 'BlogCtrl',
      resolve: {
        tags: ['Tags', function(Tags) {
          return Tags.getAll();
        }]
      }
    });

}]);

blog.controller('BlogCtrl', ['$rootScope', '$scope', '$http', '$sce', 'tags', 'configuration',
                function($rootScope, $scope, $http, $sce, tags, configuration) {

  $http.get(configuration.apiUrl + '/entries/').success(function(entries) {
    _.each(entries, function(entry) {
      entry.year = new Date(entry.createdDate).getFullYear();
      entry.month = new Date(entry.createdDate).getMonth() + 1;
      entry.day = new Date(entry.createdDate).getDate();
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });

    var years = _.groupBy(entries, function(entry) {
      return new Date(entry.createdDate).getFullYear();
    });
    years = _.each(years, function(year, key) {
      year.year = key;
    });
    $scope.years = _.sortBy(years, function(year, key) {
      return -key;
    });

    $rootScope.title = 'Archives - MoreCat Web';
  });

  $scope.tags = tags;

}]);
