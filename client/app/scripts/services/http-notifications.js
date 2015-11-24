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
		this.all = {};

		/**
		 * @ngdoc method
		 * @name HttpNotifications#get
		 *
		 * @description
		 * Returns a specific notification
		 *
		 * @param {number} type - HTTP Status Code for notification
		 *
		 * @returns {Object} Notification object with message
		 **/

		this.get = function(type) {
			return this.all[type];
		};

		/**
		 * @ngdoc method
		 * @name HttpNotifications#set
		 *
		 * @description
		 * Sets a new notification by status code
		 *
		 * @param {number} type - HTTP Status Code for notification
		 * @param {message} string - Error info for end user
		 *
		 **/

		this.set = function(type, message) {
			this.all[type] = {
				message: message
			};
		};

		/**
		 * @ngdoc method
		 * @name HttpNotifications#clear
		 *
		 * @description
		 * Clears a notification by key
		 *
		 * @param {number} type - HTTP Status Code for notification to clear
		 **/

		this.clear = function(type) {
			delete this.all[type];
		};

		/**
		 * @ngdoc method
		 * @name HttpNotifications#clearAll
		 *
		 * @description
		 * Deletes all HttpNotifications
		 *
		 **/

		this.clearAll = function() {
			this.all = {};
		};

		return this;

	});