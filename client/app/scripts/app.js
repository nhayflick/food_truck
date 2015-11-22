'use strict';

/**
 * @ngdoc overview
 * @name foodTruckApp
 * @description
 * # foodTruckApp
 *
 * Main module of the application.
 */
angular
	.module('foodTruckApp', [
		'ngAnimate',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'nemLogging',
		'ui-leaflet',
		// 'ngMockE2E'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl as main'
			})
			.otherwise({
				redirectTo: '/'
			});
	}).run(function($httpBackend, $resource) {
		// $httpBackend.whenGET(/views\/\w+.*/).passThrough();
		// $httpBackend.whenGET(/template\/\w+.*/).passThrough();

		// $httpBackend.whenGET(/food-trucks-list.json/).passThrough();
		// $httpBackend.whenGET(/food_trucks.*/).respond([{
		// 	"status": "REQUESTED",
		// 	"permit": "11MFF-0039",
		// 	"block": "3711",
		// 	"received": "Mar  7 2011  4:11PM",
		// 	"facilitytype": "Truck",
		// 	"blocklot": "3711018",
		// 	"locationdescription": "MAIN ST: MARKET ST to MISSION ST (1 - 99)",
		// 	"cnn": "8627000",
		// 	"priorpermit": "0",
		// 	"schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=11MFF-0039&ExportPDF=1&Filename=11MFF-0039_schedule.pdf",
		// 	"address": "50 MAIN ST",
		// 	"applicant": "Bombay Blvd.",
		// 	"lot": "018",
		// 	"fooditems": "Indian Style: BBQ: Variety of Curries: Rice: Wraps: Breads (Naan: Rotis: Parathas): Desserts: Pizza.  Beverages: Condiments: Indian Soups: Salads & Appetizer Varieties.",
		// 	"objectid": "305709",
		// 	"dayshours": "Mo-Su:10AM-3PM/5PM-8PM"
		// }, {
		// 	"location": {
		// 		"needs_recoding": false,
		// 		"longitude": "-122.397517086459",
		// 		"latitude": "37.7917780021754"
		// 	},
		// 	"status": "REQUESTED",
		// 	"permit": "11MFF-0039",
		// 	"block": "3710",
		// 	"received": "Mar  7 2011  4:11PM",
		// 	"facilitytype": "Truck",
		// 	"blocklot": "3710020",
		// 	"locationdescription": "BEALE ST: DAVIS ST \\ MARKET ST \\ PINE ST to MISSION ST (1 - 99)",
		// 	"cnn": "2863000",
		// 	"priorpermit": "0",
		// 	"schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=11MFF-0039&ExportPDF=1&Filename=11MFF-0039_schedule.pdf",
		// 	"address": "333 MARKET ST",
		// 	"applicant": "Bombay Blvd.",
		// 	"lot": "020",
		// 	"fooditems": "Indian Style: BBQ: Variety of Curries: Rice: Wraps: Breads (Naan: Rotis: Parathas): Desserts: Pizza.  Beverages: Condiments: Indian Soups: Salads & Appetizer Varieties.",
		// 	"longitude": "-122.397517086469",
		// 	"latitude": "37.791777988406",
		// 	"objectid": "305715",
		// 	"y": "2116324.598",
		// 	"dayshours": "Mo-Su:10AM-3PM/5PM-8PM",
		// 	"x": "6013405.022"
		// }, {
		// 	"status": "REQUESTED",
		// 	"permit": "11MFF-0040",
		// 	"block": "3721",
		// 	"received": "Mar  7 2011  4:38PM",
		// 	"facilitytype": "Truck",
		// 	"blocklot": "3721079",
		// 	"locationdescription": "MISSION ST: SHAW ALY to ANTHONY ST (543 - 586)",
		// 	"cnn": "9090000",
		// 	"priorpermit": "0",
		// 	"schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=11MFF-0040&ExportPDF=1&Filename=11MFF-0040_schedule.pdf",
		// 	"address": "561 MISSION ST",
		// 	"applicant": "Bombay Blvd.",
		// 	"lot": "079",
		// 	"fooditems": "Indian Style: BBQ: Variety of Curries: Rice: Wraps: Breads (Naan: Rotis: Parathas): Desserts: Pizza.  Beverages: Condiments: Indian Soups: Salads & Appetizer Varieties.",
		// 	"objectid": "305727",
		// 	"dayshours": "Mo-Su:10AM-3PM/5PM-8PM"
		// }]);
		// $httpBackend.whenGET(/.*/).passThrough();
	});