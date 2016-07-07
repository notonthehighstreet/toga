
module.exports = {
  before(browser) {
    browser.pageLoaded('/nested');
  },
  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.expect.element('#nested').to.be.present;
  },

  ['component renders an image'](browser) {
    browser.expect.element('.toga-test-nested').to.be.present;
    browser.getCssProperty('.toga-test-nested', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-nested/assets/images/product_mosaic.jpg")');
    });
  },

  ['component javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test-nested');
    browser.expect.element('.toga-test-nested.clicked').to.be.present;
  },

  ['nested component renders an image'](browser) {
    browser.expect.element('[toga="test-nested"] .toga-test-one').to.be.present;
    browser.getCssProperty('[toga="test-nested"] .toga-test-one', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg")');
    });
  },

  ['nested component javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-nested"] .toga-test-one');
    browser.expect.element('[toga="test-nested"] .toga-test-one.clicked').to.be.present;
  }
};
