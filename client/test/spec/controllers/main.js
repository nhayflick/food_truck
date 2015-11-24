'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('foodTruckApp'));

	var MainCtrl,
		FoodTrucks,
		HttpNotifications,
		scope,
		expectedMarkers,
		expectedResponse,
		disconnectedResponse,
		errorResponse,
		$timeout,
		$filter,
		$q;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$q_, _$filter_, _FoodTrucks_, _HttpNotifications_, $rootScope, _$timeout_) {

		$q = _$q_;
		$timeout = _$timeout_;
		$filter = _$filter_;
		FoodTrucks = _FoodTrucks_;
		HttpNotifications = _HttpNotifications_;
		expectedResponse = {
			status: 200,
			data: {
				lat: 37.7833,
				lng: -122.4167,
				address: '555 Eddy St, San Francisco, CA 94109, USA',
				trucks: readJSON('test/mock/food-trucks-list.json')
			}
		};
		errorResponse = {
			status: 422
		};
		disconnectedResponse = {
			status: -1,
			config: {
				timeout: {
					$$state: {
						status: 0
					}
				},
				params: {
					address: '555 Eddy St, San Francisco, CA 94109, USA'
				}
			}
		};
		scope = $rootScope.$new();

		spyOn(FoodTrucks, 'fetch').and.callFake(function(lat, lng, address) {
			// succeess
			if (lat && lng || address) {
				return {
					then: function(callback) {
						return callback(expectedResponse);
					}
				};
				// fail
			} else {
				return {
					then: function(callback, errorCallback) {
						return errorCallback(errorResponse);
					}
				};
			}
		});
		spyOn(FoodTrucks, 'getMarkers').and.callThrough();

		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});

		scope.$digest();

	}));

	describe('while initializing', function() {

		it('should set the leaflet center object on the controller', function() {

			expect(MainCtrl.center.lat).toBe(37.7833);
			expect(MainCtrl.center.lng).toBe(-122.4167);
			expect(MainCtrl.center.zoom).toBe(16);

		});

		it('should fetch and parse a list of food trucks from the venue\'s starting location', function() {

			expect(FoodTrucks.fetch).toHaveBeenCalledWith(MainCtrl.center.lat, MainCtrl.center.lng);
			expect(FoodTrucks.getMarkers).toHaveBeenCalledWith(expectedResponse.data.trucks);
			expect(MainCtrl.address).toBe('555 Eddy St, San Francisco, CA 94109, USA');

		});

	});

	describe('while listening for map drags', function() {

		it('should listen for leaflet\'s move event and requery with updated coodinates', function() {

			var expectedLat = MainCtrl.center.lat + 1,
				expectedLng = MainCtrl.center.lng + 1;

			MainCtrl.center.lat++;
			MainCtrl.center.lng++;

			scope.$broadcast('leafletDirectiveMap.moveend');

			expect(FoodTrucks.fetch).toHaveBeenCalledWith(expectedLat, expectedLng);

		});

	});

	describe('while listening for marker events', function() {

		it('should highlight the correct marker on selection', function() {

			expect(MainCtrl.focusId).toBe(0);
			expect(MainCtrl.truckMarkers[1].icon.markerColor).toBe('black');

			MainCtrl.focusId = 1;
			// trigger $watch expression
			scope.$digest();

			expect(MainCtrl.truckMarkers[1].icon.markerColor).toBe('blue');

			MainCtrl.focusId = 2;
			// trigger $watch expression
			scope.$digest();
			expect(MainCtrl.truckMarkers[1].icon.markerColor).toBe('black');
			expect(MainCtrl.truckMarkers[2].icon.markerColor).toBe('blue');

		});


	});

	describe('after fetch request', function() {

		it('should forward errors to the HttpNotifications service', function() {
			spyOn(HttpNotifications, 'set');

			MainCtrl.fetchByAddress();

			expect(HttpNotifications.set).toHaveBeenCalledWith(422, 'Bad search query. Please try another location.');
		});

		it('should clear HttpNotifications on success', function() {
			spyOn(HttpNotifications, 'clearAll');
			spyOn(HttpNotifications, 'set');

			MainCtrl.fetchByAddress();
			expect(HttpNotifications.set).toHaveBeenCalled();

			MainCtrl.fetchByAddress('555 Eddy St');
			expect(HttpNotifications.clearAll).toHaveBeenCalledWith();
		});

	});

	describe('with poor connectivity', function() {

		beforeEach(function() {
			FoodTrucks.fetch.and.callFake(function(lat, lng, address) {
				return {
					then: function(callback, errorCallback) {
						return errorCallback(disconnectedResponse);
					}
				};
			});
		});

		it('should retry the fetch request if status is -1', function() {
			// NB: Fetch was already called once in the outermost beforeEach

			MainCtrl.fetchByAddress('555 Eddy St');
			expect(FoodTrucks.fetch.calls.count()).toBe(2);

			$timeout.flush();
			expect(FoodTrucks.fetch.calls.count()).toBe(3);
		});

		it('should cancel retrying if a new request is made', function() {
			// First Query & Fail
			MainCtrl.fetchByAddress('555 Eddy St');
			expect(FoodTrucks.fetch).toHaveBeenCalledWith(false, false, '555 Eddy St');
			expect(FoodTrucks.fetch.calls.count()).toBe(2);

			// Now Query & Succeed
			FoodTrucks.fetch.and.callFake(function(lat, lng, address) {
				return {
					then: function(callback, errorCallback) {
						return callback(expectedResponse);
					}
				};
			});

			MainCtrl.fetchByAddress('988 Potrero Ave');
			expect(FoodTrucks.fetch).toHaveBeenCalledWith(false, false, '988 Potrero Ave');
			expect(FoodTrucks.fetch.calls.count()).toBe(3);
			$timeout.verifyNoPendingTasks();
		});

	});

});