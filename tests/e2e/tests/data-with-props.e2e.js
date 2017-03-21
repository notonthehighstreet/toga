
module.exports = {
  before(browser) {
    browser.pageLoaded('/data-with-props');
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
    browser.expect.element('.data-value--0').to.be.present;
    browser.expect.element('.data-value--1').to.be.present;
    browser.expect.element('.data-value--2').to.be.present;
    browser.expect.element('.data-value--3').to.be.present;
  },

  ['data should not carry state from previous render'](browser) {
    browser.pageLoaded('/data');
    browser.expect.element('.data-list__item--0').to.be.present;
    browser.expect.element('.data-list__item--0 .data-list__title').text.not.to.equal('props');
    browser.expect.element('.data-list__item--0 .data-list__value').text.not.to.equal(fakeProps);
  },

};
