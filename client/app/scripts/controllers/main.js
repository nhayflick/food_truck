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

			var lat = main.center.lat,
				lng = main.center.lng;

			FoodTrucks.fetch(lat, lng).then(onFetchSuccess, onFetchError);

			// Clear Focus in UI
			main.focusId = 0;
		}


		/**
		 * @ngdoc function
		 * @name fetchByAddress
		 * @description Query for nearby foodtrucks by address
		 *
		 * @param {string} address - address to geocode against on server
		 *
		 */

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
			// Process response
			angular.extend(main, {
				serverError: false,
				trucks: response.data.trucks,
				address: response.data.address,
				truckMarkers: FoodTrucks.getMarkers(response.data.trucks)
			});
			main.center.lat = parseFloat(response.data.lat);
			main.center.lng = parseFloat(response.data.lng);
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
			if (status > 0) {
				main.serverError = true;
			}
		}

		/**
		 * @ngdoc function
		 * @name onTruckClick
		 * @description Find truck by id, set marker color to highligh state and reset remaining markers
		 *
		 * @param {string} targetId - key to match in truckMarkers colleciton
		 * 
		 */

		function onTruckClick(targetId) {
			main.focusId = parseInt(targetId);
		}

		/**
		 * @ngdoc function
		 * @name highlightMarker
		 * @description Updates leaflet truckMarkers to show a new highlighted marker
		 *
		 * @param {number} markerId - id of truckMarker to highlight
		 * 
		 */

		function highlightMarker(markerId) {
			angular.forEach(main.truckMarkers, function (truck, currId) {
				if (parseInt(currId) === markerId) {
					truck.icon.markerColor = 'blue';
				} else {
					truck.icon.markerColor = 'black';
				}
			});
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
				markers: {}
			},
			focusId: 0,
			fetchByAddress: fetchByAddress
		});

		// Fetch Trucks when movement stops
		$scope.$on('leafletDirectiveMap.moveend', fetchNearbyFoodTrucks);

		// Find focused Truck on click
		$scope.$on('leafletDirectiveMarker.click', function(event, args){
			onTruckClick(args.modelName);
		});

		// Update Focused Markers in Leaflet UI
		$scope.$watch(
			function () {
  			return main.focusId;
			}, 
			function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					highlightMarker(newValue);
				}
			}
		);

		fetchNearbyFoodTrucks();
	});