'use strict';

describe('Main View', function() {

    beforeEach(function() {
      browser.driver.get('about:blank');
      browser.get('/#/');
      var EC = protractor.ExpectedConditions,
        e = element(by.css('.awesome-marker-icon-black'));

      browser.wait(EC.presenceOf(e), 20000);
    });

    it('should fetch and render 11 truck markers near the starting location', function () {

      var markers = element.all(by.css('.awesome-marker-icon-black'));
      expect(markers.count()).toEqual(11);
    });

    it('should fill the starting address in the search bar', function () {

      var searchBar = element(by.css('#location-search-input'));

      expect(searchBar.getAttribute('value')).toEqual('555 Eddy St, San Francisco, CA 94109, USA');
    });

});
