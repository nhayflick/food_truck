'use strict';

/**
 * @ngdoc directive
 * @name foodTruckApp.directive:ftCenterMarker
 * @description
 * # A leaflet marker centered within it's parent
 */
angular.module('foodTruckApp')
	.directive('ftCenterMarker', function() {
		return {
			templateUrl: 'views/directives/center-marker.html',
			restrict: 'E'
		};
	});