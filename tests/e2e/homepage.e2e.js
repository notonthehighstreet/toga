
module.exports = {
  before(browser) {
    browser.pageLoaded('/');
  },
  after(browser) {
    browser.end();
  },

  ['test homepage should render the \'one component\' page'](browser) {
    browser.expect.element('#one').to.be.present;
  },

  ['\'test component\' javascript should work (clicks should change the class name)'](browser) {
    browser.pageLoaded('/multiple');
    browser.expect.element('#multiple').to.be.present;
    
    browser.safeClick('.toga-test');
    browser.expect.element('.toga-test.clicked').to.be.present;
  }
};
