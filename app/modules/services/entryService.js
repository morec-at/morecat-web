'use strict';

var entryService = angular.module('entryService', []);

entryService.factory('Entry', ['$rootScope', '$routeParams', '$http', '$sce', 'DateFormat', function($rootScope, $routeParams, $http, $sce, DateFormat) {
  function getRecent() {
    return  $http.get($rootScope.apiUrl + '/entries/recent').then(function(recent) {
      setUpEntries(recent.data.elements);
      return recent.data;
    });
  }

  function getPage(page, size) {
    return  $http.get($rootScope.apiUrl + '/entries?page=' + page + '&size=' + size).then(function(entryPage) {
      setUpEntries(entryPage.data.elements);
      return entryPage.data;
    });
  }

  function getPageByTag(tag, page, size) {
    return  $http.get($rootScope.apiUrl + '/entries/tags/' + tag + '?page=' + page + '&size=' + size).then(function(entryPageByTag) {
      setUpEntries(entryPageByTag.data.elements);
      return entryPageByTag.data;
    });
  }

  function getEntry(year, month, day, permalink) {
    return $http.get($rootScope.apiUrl + '/entries/' + year + '/' + month + '/' + day + '/' + permalink).then(function(entry) {
      setUpEntry(entry.data.element);
      return entry.data;
    });
  }

  function setUpEntries(entries) {
    _.each(entries, function(entry) {
      setUpEntry(entry);
    });
    return entries;
  }

  function setUpEntry(entry) {
    entry.url = '/blog/' + DateFormat.format(new Date(entry.createdDate), 'YYYY/MM/DD/') + entry.permalink;
    entry.content = $sce.trustAsHtml(entry.content);
    var inlineTags = '';
    _.each(entry.tags, function(tag) {
      inlineTags += '[<a href="/blog/tags/' + tag + '">';
      inlineTags += tag;
      inlineTags += '</a>]';
    });
    entry.inlineTags = $sce.trustAsHtml(inlineTags);
    return entry;
  }

  return {
    getRecent: getRecent,
    getPage: getPage,
    getPageByTag: getPageByTag,
    getEntry: getEntry,
    setUpEntries: setUpEntries
  };
}]);