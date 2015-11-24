'use strict';

/**
 * @ngdoc service
 * @name foodTruckApp.HttpNotifications
 * @description
 * # HttpNotifications
 * Factory to instantiate a HttpNotifications singleton.
 */
angular.module('foodTruckApp')
	.service('HttpNotifications', function() {
		// AngularJS will instantiate a singleton by calling "new" on this function

		// memory object of application http notifications
		// uses the http status code as the type

		// return as collection
		this.all = {};

		this.get = function(type) {
			return this.all[type];
		};

		this.set = function(type, message) {
			this.all[type] = {
				message: message
			};
		};

		this.clear = function(type) {
			delete this.all[type];
		}

		this.clearAll = function() {
			this.all = {};
		}

		return this;

	});