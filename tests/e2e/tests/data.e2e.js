
module.exports = {
  before(browser) {
    browser.pageLoaded('/data');
  },
  after(browser) {
    browser.end();
  },

  ['load the page'](browser) {
    browser.expect.element('#data').to.be.present;
  },

  ['component renders data'](browser) {
    browser.expect.element('.data-list').to.be.present;
  },

  ['data should change when clicking the button'](browser) {
    browser.expect.element('.data-list__item--1').to.be.present;
    browser.getText('.data-list__item--1', (text) => {
      browser
        .safeClick('button')
        .waitForElementNotPresent('.loading', 1000)
        .expect.element('.data-list__item--1').text.to.not.equal(text.value);
    });
  },

};
