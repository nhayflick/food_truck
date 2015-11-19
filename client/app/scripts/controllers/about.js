'use strict';

/**
 * @ngdoc function
 * @name foodTruckApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the foodTruckApp
 */
angular.module('foodTruckApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
