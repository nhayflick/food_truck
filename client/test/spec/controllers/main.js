'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('foodTruckApp'));

  var MainCtrl,
    FoodTrucks,
    response,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _FoodTrucks_) {
    FoodTrucks = _FoodTrucks_;
    response = {
      status: 200,
      data: readJSON('test/mock/food-trucks-list.json')
    };

    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should set the leaflet center object on the controller\'s scope', function () {
    expect(scope.center.lat).toBe(37.7833);
    expect(scope.center.lng).toBe(-122.4167);
    expect(scope.center.zoom).toBe(12);
  });

  it('should fetch and parse a list of food trucks from the venue\'s starting location', function () {

    spyOn(FoodTrucks, 'fetch').and.callFake(function() {
      return {
        success: function(callback) { callback(response)}
      }
    });

    spyOn(FoodTrucks, 'getMarkers').and.callThrough();

    expect(FoodTrucks.fetch).toHaveBeenCalledWith(scope.center.lat, scope.center.lng);
    expect(FoodTrucks.getMarkers).toHaveBeenCalledWith(response.data);
  });

});
