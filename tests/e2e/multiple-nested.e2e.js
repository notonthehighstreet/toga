
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
    browser.expect.element('[toga="test-one"] .toga-test-one').to.be.present;
    browser.getCssProperty('[toga="test-one"] .toga-test-one', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'first component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-one"] .toga-test-one');
    browser.expect.element('[toga="test-one"] .toga-test-one.clicked').to.be.present;
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
    browser.expect.element('[toga="test-nested"] .toga-test-one').to.be.present;
    browser.getCssProperty('[toga="test-nested"] .toga-test-one', 'backgroundImage', function(result) {
      this.assert.equal(result.value, 'url("http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg")');
    });
  },

  ['\'nested component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-nested"] .toga-test-one');
    browser.expect.element('[toga="test-nested"] .toga-test-one.clicked').to.be.present;
  }
};
