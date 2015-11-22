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
     * @param {number} lat - Query Latitude
     * @param {number} lng - Query Longitude
     *
     * @returns {Array} list of food truck results
     */

    this.fetch = function (lat, lng) {
      return $http({
        method: 'GET',
        url: 'api/trucks',
        params: {
          search: [lat,lng].join(',')
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
        if (!truck.lat || !truck.lat) {
          return false;
        }

        var currMarker = {
          lat: parseFloat(truck.lat),
          lng: parseFloat(truck.lng),
          draggable: false,
          focus: true,
          title: truck.name,
          label: {
            message: truck.name,
            options: {
              noHide: true,
            }
          }
        };

        markers[truck.id] = currMarker;
      });

      return markers;
    };

    return this;
  });
