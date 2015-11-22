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

		function fetchNearbyFoodTrucks(event, args) {
			var lat = main.center.lat,
				lng = main.center.lng;
			// Check for new map center
			if (typeof args !== 'undefined') {
				var newCenter = args.leafletEvent.target.getCenter();
				lat = newCenter.lat;
				lng = newCenter.lng;
			}
			FoodTrucks.fetch(lat, lng).then(onFetchSuccess, onFetchError);
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
				zoom: 16
			},
			leafletEvents: {
				map: {
					enable: ['dragend'],
					logic: 'emit'
				}
			}
		});

		// Fetch Trucks when drag stops
		$scope.$on('leafletDirectiveMap.dragend', fetchNearbyFoodTrucks);

		// $scope.$watch('main.center.lat', function (newVal, oldVal) {
  //     if (oldVal && newVal !== oldVal) {
  //       fetchNearbyFoodTrucks();
  //     }
  //   });

		fetchNearbyFoodTrucks();
	});