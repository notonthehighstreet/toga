import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Copyright from '../';

describe('copyright component', () => {
  let renderedComponent;
  let componentDOM;

  beforeEach(() => {
    renderedComponent = shallow(<Copyright/>);
    componentDOM = renderedComponent.find('.toga-copyright');
  });

  describe('initial state', () => {
    it('renders with a copyright class', () => {
      expect(componentDOM.props().className).to.eq('toga-copyright');
    });
  });
});
