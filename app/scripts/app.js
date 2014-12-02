'use strict';

/**
 * @ngdoc overview
 * @name applebeesApp
 * @description
 * # applebeesApp
 *
 * Main module of the application.
 */
angular
  .module('applebeesApp', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .filter('trustAsResourceUrl', function($sce) {
    return function(val) {
      return $sce.trustAsResourceUrl(val);
    };
  })
  // I add this to all my projects, super handy
  .directive('ngEnter', function () { 
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/404', {
        templateUrl: 'views/error.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
