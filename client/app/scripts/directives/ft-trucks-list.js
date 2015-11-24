'use strict';

/**
 * @ngdoc directive
 * @name foodTruckApp.directive:ftTrucksList
 * @description
 * # Renders a horizontal list of Food Trucks
 */
angular.module('foodTruckApp')
	.directive('ftTrucksList', function() {
		return {
			scope: {
				ftTrucks: '=',
				ftFocusId: '='
			},
			bindToController: true,
			restrict: 'E',
			controller: function ftTrucksListCtrl() {},
			controllerAs: 'trucksList',
			templateUrl: 'views/directives/trucks-list.html'
		};
	});