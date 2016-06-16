
module.exports = {

  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.pageLoaded('/locale');
    browser.expect.element('#locale').to.be.present;
    browser.expect.element('.toga-test').to.be.present;
  },

  ['test component renders default locale'](browser) {
    browser.pageLoaded('/locale');
    browser.assert.containsText('#test-locale', 'en');
  },

  ['test componentrenders en locale'](browser) {
    browser.pageLoaded('/locale?locale=en');
    browser.assert.containsText('#test-locale', 'en');

  },

  ['test component renders de locale'](browser) {
    browser.pageLoaded('/locale?locale=de');
    browser.assert.containsText('#test-locale', 'de');
  }
};
