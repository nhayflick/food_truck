'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('foodTruckApp'));

	var MainCtrl,
		FoodTrucks,
		scope,
		expectedMarkers,
    expectedResponse,
		$q;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$q_, _FoodTrucks_, $rootScope) {

		$q = _$q_;
		FoodTrucks = _FoodTrucks_;
		expectedResponse = {
			status: 200,
			data: {
        lat: 37.7833,
        lng: -122.4167,
        address: '555 Eddy St, San Francisco, CA 94109, USA',
        trucks: readJSON('test/mock/food-trucks-list.json')
      }
		};
		scope = $rootScope.$new();

		spyOn(FoodTrucks, 'fetch').and.callFake(function() {
			return {
				then: function(callback) {
					return callback(expectedResponse);
				}
			};
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

    it('highlight the correct marker on click', function() {

    });

    it('unhighlight all unclicked markers', function() {

    });

  });

});