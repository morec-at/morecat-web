'use strict';

var products = angular.module('products', []);

products.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/products', {
      templateUrl: 'assets/partials/contents/products/productsTmpl.html',
      controller: 'ProductsCtrl'
    });

}]);

products.controller('ProductsCtrl', ['$rootScope', function($rootScope) {
  $rootScope.title = 'Products - MoreCat Web';
}]);