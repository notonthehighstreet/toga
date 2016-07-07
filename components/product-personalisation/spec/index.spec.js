import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('product personalisation component', () => {
  let Field;
  let renderedComponent;
  let componentDOM;

  beforeEach(() => {
    Field = require('../');
  });

  it.skip('is contained within a row', () => {
    renderedComponent = shallow(<Field  />);
    componentDOM = renderedComponent.find('.toga-form__row input');
    expect(componentDOM).to.have.length(1);
  });

});
