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
			data: readJSON('test/mock/food-trucks-list.json')
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

      var expected = [MainCtrl.center.lat, MainCtrl.center.lng].join(',');

			expect(MainCtrl.center.lat).toBe(37.7833);
			expect(MainCtrl.center.lng).toBe(-122.4167);
			expect(MainCtrl.center.zoom).toBe(16);

		});

		it('should fetch and parse a list of food trucks from the venue\'s starting location', function() {

			expect(FoodTrucks.fetch).toHaveBeenCalledWith(MainCtrl.center.lat, MainCtrl.center.lng);
			expect(FoodTrucks.getMarkers).toHaveBeenCalledWith(expectedResponse.data);

		});

	});

	describe('while listening for map drags', function() {

		it('should listen for leaflet\'s drag event and requery with updated coodinates', function() {

      var leafletObj = {
        leafletEvent: {
          target: {
            getCenter: function () {
              return {
                lat: MainCtrl.center.lat += 1, 
                lng: MainCtrl.center.lng += 1
              };
            }
          }
        }
      }, 
      expectedLat = MainCtrl.center.lat + 1, 
      expectedLng = MainCtrl.center.lng + 1;

			scope.$broadcast('leafletDirectiveMap.dragend', leafletObj);

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