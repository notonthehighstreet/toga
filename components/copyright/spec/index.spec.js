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
    componentDOM = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
  });

  describe('initial state', () => {
    it('renders with a copyright class', () => {
      expect(componentDOM.className).to.equal('toga-copyright');
    });
  });
  describe('hover state', () => {
    beforeEach(() => {
      TestUtils.Simulate.mouseOver(componentDOM);
    });

    it('renders with a boom class', () => {
      expect(componentDOM.className).to.equal('toga-copyright boom');
    });

    describe('hover state is removed', () => {
      beforeEach(() => {
        TestUtils.Simulate.mouseOut(componentDOM);
      });
      it('renders without a boom class', () => {
        expect(componentDOM.className).to.equal('toga-copyright');
      });
    });
  });
});
