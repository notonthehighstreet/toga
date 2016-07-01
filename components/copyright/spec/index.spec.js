import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('copyright component', () => {
  let Copyright;
  let renderedComponent;
  let componentDOM;

  beforeEach(() => {
    Copyright = require('../');
    renderedComponent = shallow(<Copyright/>);
    componentDOM = renderedComponent.find('.toga-copyright');
  });

  describe('initial state', () => {
    it('renders with a copyright class', () => {
      expect(componentDOM.props().className).to.eq('toga-copyright');
    });
  });
});
