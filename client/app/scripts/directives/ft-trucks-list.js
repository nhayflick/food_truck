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
			scope: {},
			bindToController: {
				ftTrucks: '=',
				ftFocusId: '='
			},
			restrict: 'E',
			controller: function ftTrucksListCtrl() {
				var ftTrucksList = this;
			},
			controllerAs: 'trucksList',
			templateUrl: 'views/directives/trucks-list.html'
		};
	});