
module.exports = {
  before(browser) {
    browser.pageLoaded('/multiple');
  },
  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.expect.element('#multiple').to.be.present;
  },

  ['first component renders an image'](browser) {
    browser.expect.element('.toga-test').to.be.present;
    browser.getCssProperty('.toga-test', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'first component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test');
    browser.expect.element('.toga-test.clicked').to.be.present;
  },

  ['second component renders an image'](browser) {
    browser.expect.element('.toga-test2').to.be.present;
    browser.getCssProperty('.toga-test2', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test2/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'second component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test2');
    browser.expect.element('.toga-test2.clicked').to.be.present;
  }
};
