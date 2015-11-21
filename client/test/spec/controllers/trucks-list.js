'use strict';

describe('Controller: TrucksListCtrl', function() {

	// load the controller's module
	beforeEach(module('foodTruckApp'));

	var TrucksListCtrl,
		expected,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		TrucksListCtrl = $controller('TrucksListCtrl', {
			$scope: scope
		}, {
			ftTrucks: readJSON('test/mock/food-trucks-list.json')
		});
	}));

	it('should attach a list of awesomeThings to the scope', function() {

		var expected = readJSON('test/mock/food-trucks-list.json');
		expect(TrucksListCtrl.ftTrucks).toEqual(expected);

	});
});