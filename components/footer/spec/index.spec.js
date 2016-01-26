const expect = require('chai').expect;
const shallowRender = require('../../../spec/shallowRender');

describe('footer component', () => {
  let Footer;
  let renderedOutput;

  beforeEach(() => {
    Footer = require('../')();
    renderedOutput = shallowRender(Footer);
  });
  describe('initial state', () => {
    it('renders Copyright as child component', () => {
      expect(renderedOutput).to.be.ok;
    });
  });
});
