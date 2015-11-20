'use strict';

describe('Service: FoodTrucks', function () {

  // load the service's module
  beforeEach(module('foodTruckApp'));

  // instantiate service
  var FoodTrucks;

  beforeEach(inject(function (_FoodTrucks_) {

    FoodTrucks = _FoodTrucks_;

  }));

  describe('fetching from food_trucks API', function() {

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    it('should fetch from the correct endpoint with latitude and longitude', function () {
      
      $httpBackend.expectGET('/food_trucks?latitude=90&longitude=90').respond({});
      
      FoodTrucks.fetch(90, 90);
      $httpBackend.flush();

    });

    it('should fetch a list of food trucks and pass to a success callback', function () {
      var foodTrucks,
        // $http success handler
        onSuccess = function(response) {
          foodTrucks = response.data;
        };

      // mock API response
      $httpBackend.expectGET('/food_trucks?latitude=90&longitude=90').respond(readJSON('test/mock/food-trucks-list.json'));
      
      FoodTrucks.fetch(90, 90).then(onSuccess);
      $httpBackend.flush();
      
      expect(foodTrucks.length).toBe(3);

    });

  });

  describe('returning markers', function() {
    var foodTrucks,
      markers;

    it('should transform an array of trucks into a markers dictionary', function () {
      
      foodTrucks = readJSON('test/mock/food-trucks-list.json');
      markers = FoodTrucks.getMarkers(foodTrucks);

      expect(markers).toEqual(jasmine.any(Object));
      expect(markers[305715]).toEqual(jasmine.any(Object));

    });

    it('should only return markers with valid lat + long', function () {
      
      foodTrucks = readJSON('test/mock/food-trucks-list.json');
      markers = FoodTrucks.getMarkers(foodTrucks);

      expect(Object.keys(markers).length).toEqual(1);
      expect(markers[305715].lat).toEqual(37.7917780021754);
      expect(markers[305715].lng).toEqual(-122.397517086459);

    });

    it('should return an empty object if trucks array is empty', function () {

      markers = FoodTrucks.getMarkers([]);

      expect(markers).toEqual({});

    });

  });

});
