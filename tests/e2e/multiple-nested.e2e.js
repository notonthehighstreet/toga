
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

  ['first component css has loaded correctly (and renders an image)'](browser) {
    browser.expect.element('[toga="test-one"] .toga-test-one').to.be.present;
    browser.getCssProperty('[toga="test-one"] .toga-test-one', 'backgroundImage', function(result) {
      this.assert.ok(result.value.indexOf('http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg')>-1);
    });
  },

  ['\'first component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-one"] .toga-test-one');
    browser.expect.element('[toga="test-one"] .toga-test-one.clicked').to.be.present;
  },

  ['second component renders an image'](browser) {
    browser.expect.element('.toga-test-nested').to.be.present;
    browser.getCssProperty('.toga-test-nested', 'backgroundImage', function(result) {
      this.assert.ok(result.value.indexOf('http://localhost:8080/v1/test-nested/assets/images/product_mosaic.jpg')>-1);
    });
  },

  ['\'second component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('.toga-test-nested');
    browser.expect.element('.toga-test-nested.clicked').to.be.present;
  },

  ['nested component renders an image'](browser) {
    browser.expect.element('[toga="test-nested"] .toga-test-one').to.be.present;
    browser.getCssProperty('[toga="test-nested"] .toga-test-one', 'backgroundImage', function(result) {
      this.assert.ok(result.value.indexOf('http://localhost:8080/v1/test-one/assets/images/product_mosaic.jpg')>-1);
    });
  },

  ['\'nested component\' javascript should be auto-initialised (clicks should change the class name)'](browser) {
    browser.safeClick('[toga="test-nested"] .toga-test-one');
    browser.expect.element('[toga="test-nested"] .toga-test-one.clicked').to.be.present;
  }
};
