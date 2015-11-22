'use strict';

/**
 * @ngdoc service
 * @name foodTruckApp.FoodTrucks
 * @description
 * # FoodTrucks
 * Factory to instantiate a foodTrucks singleton
 */
angular.module('foodTruckApp')
  .factory('FoodTrucks', function ($http, $q) {

    var _canceler;

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

     // TODO: Throttle this

    this.fetch = function (lat, lng, address) {
      var params;

      if (lat && lng) {
        params = {
          lat: lat, 
          lng: lng
        }
      } else if (address) {
        params = {
          address: address
        }
      } else {
        return false;
      }
      if (_canceler) {
        _canceler.resolve();
      }
      _canceler = $q.defer();
      return $http({
        method: 'GET',
        url: 'api/trucks/search',
        timeout: _canceler.promise,
        params: params
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
        if (!truck.lat || !truck.lng) {
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
          },
          icon: {
              icon: 'cutlery',
              type: 'awesomeMarker',
              markerColor: 'black',
              iconColor: 'white'
          },
        };

        markers[truck.id] = currMarker;
      });

      return markers;
    };

    return this;
  });
