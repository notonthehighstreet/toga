
module.exports = {
  before(browser) {
    browser.pageLoaded('/one');
  },
  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.expect.element('#one').to.be.present;
  },

  ['test component renders an image'](browser) {
    browser.expect.element('.toga-test').to.be.present;
    browser.getCssProperty('.toga-test', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'test component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test');
    browser.expect.element('.toga-test.clicked').to.be.present;
  }
};
