'use strict';

/**
 * @ngdoc function
 * @name foodTruckApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Holds common functionality and data for the search bar, leaflet map and listings-sidebar 
 */
angular.module('foodTruckApp')
	.controller('MainCtrl', function($scope, $timeout, HttpNotifications, FoodTrucks) {

		var main = this,
			retryTimeout;

		/**
		 * @ngdoc function
		 * @name fetchFoodTrucks
		 * @description Query for nearby foodtrucks and pass to success callback
		 */

		function fetchNearbyFoodTrucks() {
			if (retryTimeout) {
				$timeout.cancel(retryTimeout);
			}


			var lat = main.center.lat,
				lng = main.center.lng;

			FoodTrucks.fetch(lat, lng).then(onFetchSuccess, onFetchError, onFetchNotify);

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
			if (retryTimeout) {
				$timeout.cancel(retryTimeout);
			}

			FoodTrucks.fetch(false, false, address).then(onFetchSuccess, onFetchError, onFetchNotify);
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
			// Clear All Old Error Notifications
			HttpNotifications.clearAll();
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
			// Filter out any aborted requests
			if (response.status === -1 && response.config.timeout.$$state.status === 1) {
				return false;
			}
			// Alert Errors 
			switch (response.status) {
				case -1:
					HttpNotifications.set(-1, 'Internet Connection Unavailable. Retrying Momentarily...');
					// Retry Request
					var params = response.config.params;
					retryTimeout = $timeout(function() {
						if (params.address) {
							fetchByAddress(params.address);
						} else {
							fetchNearbyFoodTrucks();
						}
					}, 8000);
					break;
				case 422:
					HttpNotifications.set(422, 'Bad search query. Please try another location.');
					break;
				case 500:
					HttpNotifications.set(500, 'We Are Experiencing Temporary Server Issues. Please Try Again Later.');
					break;
			}
		}

		/**
		 * @ngdoc function
		 * @name onFetchNotify
		 * @description Notification handling for long-running food_trucks api response
		 *
		 * @param {Object} response - notification object
		 * 
		 */

		function onFetchNotify(response) {
			if (!response.status) {
				HttpNotifications.set(-1, 'This seems to be taking a while...');
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
			angular.forEach(main.truckMarkers, function(truck, currId) {
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
			fetchByAddress: fetchByAddress,
			httpNotifications: HttpNotifications
		});

		// Fetch Trucks when movement stops
		$scope.$on('leafletDirectiveMap.moveend', fetchNearbyFoodTrucks);

		// Find focused Truck on click
		$scope.$on('leafletDirectiveMarker.click', function(event, args) {
			onTruckClick(args.modelName);
		});

		// Update Focused Markers in Leaflet UI
		$scope.$watch(
			// watch for changes on 'main.focusId'
			function() {
				return main.focusId;
			},
			// handler function
			function(newValue, oldValue) {
				if (newValue && newValue !== oldValue) {
					highlightMarker(newValue);
				}
			}
		);

		fetchNearbyFoodTrucks();
	});