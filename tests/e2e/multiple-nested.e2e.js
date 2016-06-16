
module.exports = {
  before(browser) {
    browser.pageLoaded('/multiple-nested');
  },
  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.expect.element('#multiple-nested').to.be.present;
  },

  ['first component renders an image'](browser) {
    browser.expect.element('[toga="test"] .toga-test').to.be.present;
    browser.getCssProperty('[toga="test"] .toga-test', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'first component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test"] .toga-test');
    browser.expect.element('[toga="test"] .toga-test.clicked').to.be.present;
  },

  ['second component renders an image'](browser) {
    browser.expect.element('.toga-test-nested').to.be.present;
    browser.getCssProperty('.toga-test-nested', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-nested/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'second component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test-nested');
    browser.expect.element('.toga-test-nested.clicked').to.be.present;
  },

  ['nested component renders an image'](browser) {
    browser.expect.element('[toga="test-nested"] .toga-test').to.be.present;
    browser.getCssProperty('[toga="test-nested"] .toga-test', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'nested component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-nested"] .toga-test');
    browser.expect.element('[toga="test-nested"] .toga-test.clicked').to.be.present;
  }
};
