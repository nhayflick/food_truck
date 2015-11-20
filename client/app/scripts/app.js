'use strict';

/**
 * @ngdoc overview
 * @name foodTruckApp
 * @description
 * # foodTruckApp
 *
 * Main module of the application.
 */
angular
  .module('foodTruckApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nemLogging',
    'ui-leaflet'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
