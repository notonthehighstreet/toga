const fakeProps = '{"data-key":"data-value"}';

module.exports = {
  before(browser) {
    browser.pageLoaded(`/data?props=${fakeProps}`);
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

  ['data should render from url props'](browser) {
    browser.expect.element('.data-list__item--0').to.be.present;
    browser.expect.element('.data-list__item--0 .data-list__title').text.to.equal('props');
    browser.expect.element('.data-list__item--0 .data-list__value').text.to.equal(fakeProps);
  },

};
