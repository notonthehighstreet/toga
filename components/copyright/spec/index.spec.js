const TestUtils = require('react-addons-test-utils');
const React = require('react');
const expect = require('chai').expect;

describe('copyright component', () => {
  let Copyright;
  let renderedComponent;
  let componentDOM;

  beforeEach(() => {
    Copyright = require('../')({ locale: 'en' });
    renderedComponent = TestUtils.renderIntoDocument(<Copyright/>);
    componentDOM = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'copyright-text');
  });

  describe('initial state', () => {
    it('renders with a copyright class', () => {
      expect(componentDOM.className).to.equal('copyright-text');
    });
  });
  describe('hover state', () => {
    beforeEach(() => {
      TestUtils.Simulate.mouseOver(componentDOM);
    });

    it('renders with a highlighted class', () => {
      expect(componentDOM.className).to.equal('copyright-text highlighted');
    });

    describe('hover state is removed', () => {
      beforeEach(() => {
        TestUtils.Simulate.mouseOut(componentDOM);
      });
      it('renders without a highlighted class', () => {
        expect(componentDOM.className).to.equal('copyright-text');
      });
    });
  });
});
