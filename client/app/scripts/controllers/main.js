'use strict';

/**
 * @ngdoc function
 * @name foodTruckApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodTruckApp
 */
angular.module('foodTruckApp')
  .controller('MainCtrl', function ($scope) {
    $scope.center = {
      lat: 37.7833,
      lng: -122.4167,
      zoom: 12
    }
  });
