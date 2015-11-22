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

			// Clear Focus in UI
			main.focusId = 0;

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


		// TODO: docs and test this
		function fetchByAddress(address) {
			FoodTrucks.fetch(false, false, address).then(onFetchSuccess, onFetchError);
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
			main.trucks = response.data.trucks;
			main.center.lat = parseFloat(response.data.lat);
			main.center.lng = parseFloat(response.data.lng);
			main.address = response.data.address;
			main.truckMarkers = FoodTrucks.getMarkers(response.data.trucks);
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

		/**
		 * @ngdoc function
		 * @name focusOnTruck
		 * @description Find truck by id, set marker color to highligh state and reset remaining markers
		 *
		 * @param {string} targetId - key to match in truckMarkers colleciton
		 * 
		 */

		function focusOnTruck(targetId) {
			main.focusId = targetId;
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
					enable: ['moveend'],
					logic: 'emit'
				},
				markers: {

				}
			},
			fetchByAddress: fetchByAddress
		});

		// Fetch Trucks when drag stops
		$scope.$on('leafletDirectiveMap.moveend', fetchNearbyFoodTrucks);

		// Find focused Truck on click
		$scope.$on('leafletDirectiveMarker.click', function(event, args){
			focusOnTruck(args.modelName);
		});

		$scope.$watch('main.focusId', function(newValue, oldValue) {
			if (newValue && newValue !== oldValue) {
				angular.forEach(main.truckMarkers, function (truck, currId) {
					if (parseInt(currId) === parseInt(newValue)) {
						truck.icon.markerColor = 'blue';
					} else {
						truck.icon.markerColor = 'black';
					}
				});
			}
		})

		fetchNearbyFoodTrucks();
	});