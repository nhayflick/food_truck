'use strict';

/**
 * @ngdoc function
 * @name foodTruckApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodTruckApp
 */
angular.module('foodTruckApp')
  .controller('MainCtrl', function ($scope, FoodTrucks) {

    /**
    * @ngdoc function
    * @name MainCtrl#init
    * @description Kick off initial queries
    */

    function init() {
      FoodTrucks.fetch($scope.center.lat, $scope.center.lng).then(onFetchSuccess);
    }

    /**
    * @ngdoc function
    * @name MainCtrl#onFetchSuccess
    * @description Parse response from food_trucks fetch
    *
    * @param {Object} response - $http response object of nearby food trucks
    * 
    */

    function onFetchSuccess(response) {
      $scope.truckMarkers = FoodTrucks.getMarkers(response.data);
    }

    angular.extend($scope, {
      center: {
        lat: 37.7833,
        lng: -122.4167,
        zoom: 12
      }
    });

    init();
  });
