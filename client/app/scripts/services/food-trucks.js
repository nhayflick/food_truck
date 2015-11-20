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

     /**
     * @ngdoc method
     * @name FoodTrucks#getMarkers
     *
     * @description
     * Transform a list of food trucks into a Leaflet marker dictionary
     *
     * @param {Array} trucks - Collection of food trucks
     *
     * @returns {Object} Leaflet marker dictionary of trucks
     */

    this.getMarkers = function (trucks) {
      var markers = {};

      if (!trucks) {return markers;}

      trucks.forEach(function(truck) {
        // Only include trucks with valid locations
        if (!truck.location) {
          return false;
        }

        var currMarker = {
          lat: parseFloat(truck.location.latitude),
          lng: parseFloat(truck.location.longitude),
          draggable: false,
          label: {
            message: truck.applicant,
            options: {
              noHide: true
            }
          }
        };

        markers[truck.objectid] = currMarker;
      });

      return markers;
    };

    return this;
  });
