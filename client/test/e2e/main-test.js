'use strict';

describe('Main View', function() {

	var EC = protractor.ExpectedConditions;

	beforeEach(function() {
		browser.driver.get('about:blank');
		browser.get('/#/');
		var e = element(by.css('.awesome-marker-icon-black'));

		browser.wait(EC.presenceOf(e), 12000, 'Initial truck query failed to load');
	});

	it('should fetch and render 11 truck markers near the starting location', function() {

		var markers = element.all(by.css('.awesome-marker-icon-black'));
		expect(markers.count()).toEqual(11);
	});

	it('should fill the starting address in the search bar', function() {

		var searchBar = element(by.css('#location-search-input'));

		expect(searchBar.getAttribute('value')).toEqual('555 Eddy St, San Francisco, CA 94109, USA');
	});


	it('should expand the correct truck listing when the marker is clicked on', function() {

		var testMarker = element(by.css('.awesome-marker-icon-black')),
			truckListings = element(by.css('ft-trucks-list'));

		testMarker.getAttribute('title').then(function(attr) {

			var title = attr,
				listingItem = truckListings.element(by.css('.list-group-item[data-truck-title="' + title + '"]'));

			expect(listingItem.getAttribute('class')).not.toMatch('list-group-cadet-blue');
			testMarker.click().then(function() {
				expect(listingItem.getAttribute('class')).toMatch('list-group-cadet-blue');
			});

		});
	});

	it('should highlight the marker when a listing is clicked on', function() {

		var testListingItem = element(by.css('ft-trucks-list .list-group-item'));

		testListingItem.getAttribute('data-truck-title').then(function(attr) {
			var title = attr,
				testMarker = element(by.css('.awesome-marker[title="' + title + '"]'));

			expect(testMarker.getAttribute('class')).toMatch('awesome-marker-icon-black');

			testListingItem.click().then(function() {
				expect(testListingItem.getAttribute('class')).toMatch('list-group-cadet-blue');
				expect(testMarker.getAttribute('class')).toMatch('awesome-marker-icon-blue');
			})


		});

	});

	it('should load a new set of markers when a new address is searched for', function() {
		var searchBar = element(by.css('#location-search-input')),
			searchButton = element(by.css('#location-search-btn')),
			firstMarker = element(by.css('.awesome-marker-icon-black'));

		firstMarker.getAttribute('title').then(function(attr) {
			var firstTitle = attr;
			searchBar.clear().then(function() {
				searchBar.sendKeys('1100-1198 Indiana St, San Francisco, CA 94107, USA').then(function() {
					searchButton.click().then(function() {
						var newFirstMarker = element(by.css('.awesome-marker-icon-black'));
						expect(newFirstMarker.getAttribute('title')).not.toEqual(firstTitle);
					});
				});
			});
		})
	});

	it('should load the browser\'s geo coordinates if available', function() {

	});

	it('should display appropriate empty state if no trucks are in bounds', function() {

	});

	it('should show an error if network activity fails', function() {

	});



});