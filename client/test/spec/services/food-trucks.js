'use strict';

describe('Service: FoodTrucks', function () {

  // load the service's module
  beforeEach(module('foodTruckApp'));

  // instantiate service
  var FoodTrucks,
    $httpBackend,
    foodTrucks,
    scope;

  beforeEach(inject(function (_FoodTrucks_, _$httpBackend_) {

    FoodTrucks = _FoodTrucks_;
    $httpBackend = _$httpBackend_;

  }));

  it('should fetch from the correct endpoint with latitude and longitude', function () {
    $httpBackend.expectGET('/food_trucks?latitude=90&longitude=90').respond({});
    
    FoodTrucks.fetch(90, 90);
    $httpBackend.flush();
  });

  it('should fetch a list of food trucks and pass to a success callback', function () {
    // $http success handler
    var onSuccess = function(response) {
      foodTrucks = response.data;
    };

    // mock API response
    $httpBackend.whenGET('/food_trucks?latitude=90&longitude=90').respond(readJSON('test/mock/food-trucks-list.json'));
    
    FoodTrucks.fetch(90, 90).then(onSuccess);
    $httpBackend.flush();
    
    expect(foodTrucks.length).toBe(3);

  });

});
