'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('foodTruckApp'));

	var MainCtrl,
		FoodTrucks,
		scope,
		expectedResponse,
		expectedMarkers,
		$q;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$q_, _FoodTrucks_, $rootScope) {

		$q = _$q_;
		FoodTrucks = _FoodTrucks_;
		expectedResponse = {
			status: 200,
			data: readJSON('test/mock/food-trucks-list.json')
		};
		expectedMarkers = {
			305715: {
				lat: 37.7917780021754,
				lng: -122.397517086459,
				draggable: false,
				label: {
					message: 'Bombay Blvd.',
					options: {
						noHide: true
					}
				}
			}
		};
		scope = $rootScope.$new();

		spyOn(FoodTrucks, 'fetch').and.callFake(function() {
			return {
				then: function(callback) {
					return callback(expectedResponse);
				}
			}
		});
		spyOn(FoodTrucks, 'getMarkers').and.callThrough();

		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});

	}));

	describe('while initializing', function() {

		it('should set the leaflet center object on the controller', function() {

			expect(MainCtrl.center.lat).toBe(37.7833);
			expect(MainCtrl.center.lng).toBe(-122.4167);
			expect(MainCtrl.center.zoom).toBe(12);

		});

		it('should fetch and parse a list of food trucks from the venue\'s starting location', function() {

			expect(FoodTrucks.fetch).toHaveBeenCalledWith(MainCtrl.center.lat, MainCtrl.center.lng);
			expect(FoodTrucks.getMarkers).toHaveBeenCalledWith(expectedResponse.data);
			expect(MainCtrl.truckMarkers).toEqual(expectedMarkers);

		});

	});

	describe('while listening for map drags', function() {

		it('should listen for leaflet\'s drag event and requery for food trucks', function() {
			MainCtrl.center.lat += 1;

			scope.$broadcast('leafletDirectiveMap.dragend', {});

			expect(FoodTrucks.fetch).toHaveBeenCalledWith(MainCtrl.center.lat, MainCtrl.center.lng);

		});

	});

});