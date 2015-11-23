'use strict';

describe('Main View', function() {

    beforeEach(function() {
      browser.driver.get('about:blank');
      browser.get('/#/');
    });

    it('should fetch and render 12 truck markers near the starting location', function () {
      var markers = element.all(by.css('.awesome-marker-icon-black'));
      expect(markers.count()).toEqual(12);
    });

    it('should render 12 truck markers near the starting location', function () {
      var markers = element.all(by.css('.awesome-marker-icon-black'));
      expect(markers.count()).toEqual(12);
    });

});
