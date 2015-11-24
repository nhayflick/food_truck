'use strict';

describe('Service: FoodTrucks', function() {

	// load the service's module
	beforeEach(module('foodTruckApp'));

	// instantiate service
	var FoodTrucks;

	beforeEach(inject(function(_FoodTrucks_) {

		FoodTrucks = _FoodTrucks_;

	}));

	describe('fetching from food_trucks API', function() {

		var $httpBackend,
			$timeout,
			onSuccess,
			onError,
			onNotify,
			expectedResponse = {
				lat: 37.7833,
				lng: -122.4167,
				address: '555 Eddy St, San Francisco, CA 94109, USA',
				trucks: readJSON('test/mock/food-trucks-list.json')
			},
			expectedErrorResponse = {
				error: 'Bad Request'
			};

		beforeEach(inject(function(_$httpBackend_, _$timeout_) {
			$httpBackend = _$httpBackend_;
			$timeout = _$timeout_;
			onSuccess = jasmine.createSpy('onSuccess');
			onError = jasmine.createSpy('onError'),
				onNotify = jasmine.createSpy('onNotify');
		}));

		it('should fetch from the correct endpoint with latitude and longitude', function() {

			$httpBackend.expectGET('api/trucks/search?lat=90&lng=90').respond({});

			FoodTrucks.fetch(90, 90);
			$httpBackend.flush();

		});


		it('should fetch from the correct endpoint with address', function() {

			$httpBackend.expectGET('api/trucks/search?address=555+Eddy+St').respond({});

			FoodTrucks.fetch(false, false, '555 Eddy St');
			$httpBackend.flush();

		});

		it('should fetch a list of food trucks and pass to a success callback', function() {
			// mock API response
			$httpBackend.expectGET('api/trucks/search?lat=90&lng=90').respond(expectedResponse);

			FoodTrucks.fetch(90, 90).then(onSuccess, onError);
			$httpBackend.flush();

			expect(onSuccess).toHaveBeenCalled();
			expect(onError).not.toHaveBeenCalled();

		});

		it('should call an error handler if the request fails', function() {

			// mock API response
			$httpBackend.expectGET('api/trucks/search?lat=90&lng=90').respond(422, {
				error: 'Invalid Query'
			});

			FoodTrucks.fetch(90, 90).then(onSuccess, onError);
			$httpBackend.flush();

			expect(onError).toHaveBeenCalled();
			expect(onSuccess).not.toHaveBeenCalled();

		});

		it('should cancel earlier pending requests', function() {

			$httpBackend.expectGET('api/trucks/search?address=555+Eddy+St').respond({});
			$httpBackend.expectGET('api/trucks/search?address=570+Eddy+St').respond({});

			var firstRequest = FoodTrucks.fetch(false, false, '555 Eddy St'),
				secondRequest = FoodTrucks.fetch(false, false, '570 Eddy St');

			$httpBackend.flush();

			expect(firstRequest.$$state.value.status).toBe(-1);
			expect(secondRequest.$$state.value.status).toBe(200);

		});

		it('should trigger a notify callback if the request is still waiting after 5 seconds.', function() {

			$httpBackend.expectGET('api/trucks/search?address=565+Eddy+St').respond(200, {});

			FoodTrucks.fetch(false, false, '565 Eddy St').then(onSuccess, onError, onNotify);

			$timeout.flush();

			expect(onNotify).toHaveBeenCalledWith({});

			$httpBackend.flush();

			expect(onSuccess).toHaveBeenCalled();
		});

	});

	describe('returning markers', function() {
		var foodTrucks,
			markers;

		it('should transform an array of trucks into a markers dictionary', function() {

			foodTrucks = readJSON('test/mock/food-trucks-list.json');
			markers = FoodTrucks.getMarkers(foodTrucks);

			expect(markers).toEqual(jasmine.any(Object));
			expect(Object.keys(markers).length).toEqual(3);

			angular.forEach(foodTrucks, function(truck) {
				expect(markers[truck.id]).toEqual(jasmine.any(Object));
			});

		});

		it('should only return markers with valid lat + long', function() {

			foodTrucks = readJSON('test/mock/food-trucks-list.json');
			foodTrucks.push({
				id: 0
			});
			markers = FoodTrucks.getMarkers(foodTrucks);

			expect(Object.keys(markers).length).toEqual(foodTrucks.length - 1);

			angular.forEach(markers, function(marker) {
				expect(marker.lat).toEqual(jasmine.any(Number));
				expect(marker.lng).toEqual(jasmine.any(Number));
			});

		});

		it('should return an empty object if trucks array is empty', function() {

			markers = FoodTrucks.getMarkers([]);

			expect(markers).toEqual({});

		});

	});

});