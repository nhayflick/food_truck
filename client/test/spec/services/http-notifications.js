'use strict';

describe('Service: HttpNotifications', function() {

	// load the service's module
	beforeEach(module('foodTruckApp'));

	// instantiate service
	var HttpNotifications,
		expectedMessage = 'Server is cranky.',
		otherMessage = 'No connection.';

	beforeEach(inject(function(_HttpNotifications_) {
		HttpNotifications = _HttpNotifications_;
	}));

	it('should set and retrieve notifications', function() {
		HttpNotifications.set(500, expectedMessage);
		expect(HttpNotifications.get(500).message).toBe(expectedMessage);
		expect(Object.keys(HttpNotifications.all).length).toBe(1);
		expect(HttpNotifications.all[500].message).toBe(expectedMessage);
	});

	it('should clear notifications', function() {
		HttpNotifications.set(500, expectedMessage);
		HttpNotifications.set(-1, otherMessage);
		expect(Object.keys(HttpNotifications.all).length).toBe(2);

		HttpNotifications.clear(500);
		expect(HttpNotifications.get(500)).toBe(undefined);
		expect(Object.keys(HttpNotifications.all).length).toBe(1);

		HttpNotifications.clearAll();
		expect(HttpNotifications.all).toEqual({});
	});

});