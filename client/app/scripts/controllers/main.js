'use strict';

/**
 * @ngdoc function
 * @name foodTruckApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodTruckApp
 */
angular.module('foodTruckApp')
	.controller('MainCtrl', function($scope, FoodTrucks) {

		var main = this;

		/**
		 * @ngdoc function
		 * @name fetchFoodTrucks
		 * @description Query for nearby foodtrucks and pass to success callback
		 */

		function fetchNearbyFoodTrucks() {
			FoodTrucks.fetch(main.center.lat, main.center.lng).then(onFetchSuccess, onFetchError);
		}

		/**
		 * @ngdoc function
		 * @name onFetchSuccess
		 * @description Parse response from food_trucks fetch
		 *
		 * @param {Object} response - $http response object of nearby food trucks
		 * 
		 */

		function onFetchSuccess(response) {
			main.trucks = response.data;
			main.truckMarkers = FoodTrucks.getMarkers(response.data);
		}

		/**
		 * @ngdoc function
		 * @name onFetchError
		 * @description Error handling for food_trucks api response
		 *
		 * @param {Object} response - $http error object
		 * 
		 */

		function onFetchError(response) {

		}

		// Bind settings and initial data to controller
		angular.extend(main, {
			center: {
				lat: 37.7833,
				lng: -122.4167,
				zoom: 12
			},
			leafletEvents: {
				map: {
					enable: ['drag'],
					logic: 'emit'
				}
			}
		});

		// Fetch Trucks when Leaflet drag detected
		$scope.$on('leafletDirectiveMap.drag', fetchNearbyFoodTrucks);

		fetchNearbyFoodTrucks();
	});