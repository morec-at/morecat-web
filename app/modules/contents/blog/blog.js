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

blog.controller('BlogCtrl', ['$rootScope', '$scope', '$http', '$sce', 'tags', 'DateFormat',
                function($rootScope, $scope, $http, $sce, tags, DateFormat) {

  $http.get($rootScope.apiUrl + '/entries/').success(function(entries) {
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.url = '/blog/' + DateFormat.format(new Date(entry.createdDate), 'YYYY/MM/DD/') + entry.permalink;
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/blog/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });
  });

  $rootScope.title = 'Blog - MoreCat Web';

  $scope.tags = tags;

}]);
