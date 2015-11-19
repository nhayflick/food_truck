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

  it('should fetch food_trucks and pass to the success callback', function () {

    $httpBackend.expectGET('/food_trucks?latitude=90&longitude=90').respond(readJSON('test/mock/food-trucks-list.json'));
    FoodTrucks.fetch(90, 90).then(function (response) {
      foodTrucks = response.data;
    });
    $httpBackend.flush();
    expect(foodTrucks.length).toBe(3);

  });

});
