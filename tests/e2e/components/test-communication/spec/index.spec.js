import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Count from '../count';
import Counter from '../counter';

describe('Communication component', () => {
  let Comms;
  let renderedComponent;

  beforeEach(() => {
    Comms = require('../');
  });

  it('contains a counted component and 2 counter components', () => {
    renderedComponent = shallow(<Comms />);
    const CountDOM = renderedComponent.find(Count);
    const CounterDOM = renderedComponent.find(Counter);
    expect(CountDOM).to.have.length(1);
    expect(CounterDOM).to.have.length(2);
  });

  it('updates the count when clicking the counter buttons', () => {
    renderedComponent = mount(<Comms />);
    const CountDOM = renderedComponent.find(Count);
    const CounterDOM = renderedComponent.find(Counter);
    
    expect(CountDOM.props().count).to.eq(0);
    expect(CountDOM.find('.test-counted__amount').text()).to.eq('0');
    CounterDOM.first().simulate('click');
    expect(CountDOM.props().count).to.eq(1);
    expect(CountDOM.find('.test-counted__amount').text()).to.eq('1');
    
  });

});
