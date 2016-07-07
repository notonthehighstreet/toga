
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
    browser.expect.element('.toga-test-one').to.be.present;
    browser.getCssProperty('.toga-test-one', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'first component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test-one');
    browser.expect.element('.toga-test-one.clicked').to.be.present;
  },

  ['second component renders an image'](browser) {
    browser.expect.element('.toga-test-multiple').to.be.present;
    browser.getCssProperty('.toga-test-multiple', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-multiple/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'second component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test-multiple');
    browser.expect.element('.toga-test-multiple.clicked').to.be.present;
  }
};
