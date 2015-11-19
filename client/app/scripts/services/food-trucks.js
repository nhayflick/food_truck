'use strict';

/**
 * @ngdoc service
 * @name foodTruckApp.FoodTrucks
 * @description
 * # FoodTrucks
 * Factory to instantiate a foodTrucks singleton
 */
angular.module('foodTruckApp')
  .factory('FoodTrucks', function ($http) {

    /**
     * @ngdoc method
     * @name FoodTrucks#fetch
     *
     * @description
     * Fetch a list of food trucks from the API
     *
     * @param {number} latitude - Query Latitude
     * @param {number} longitude - Query Longitude
     *
     * @returns {Array} list of food truck results
     */

    this.fetch = function (latitude, longitude) {
      return $http({
        method: 'GET',
        url: '/food_trucks',
        params: {
          latitude: latitude,
          longitude: longitude
        }
      });
    };

    return this;
  });
