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
		'ui-leaflet',
		// 'ngMockE2E'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl as main'
			})
			.otherwise({
				redirectTo: '/'
			});
	});