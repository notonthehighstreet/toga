import helper from 'tests/spec/helper';
import React from 'react';
import {shallow} from 'enzyme';
import Price from '../../components/Price';

const {expect} = helper;

describe('Price component', () => {
  it('renders decimals', () => {
    const wrapper = shallow(
      <Price price={{currency: 'GBP', amount: 1699}}/>
    );

    expect(wrapper.hasClass('price')).to.equal(true, 'incorrect class name');
    expect(wrapper.find('.amount').text()).to.equal('16', 'incorrect amount');
    expect(wrapper.find('.decimals').text()).to.equal('.99', 'incorrect decimals');
  });

  it('renders whole values', () => {
    const wrapper = shallow(
      <Price price={{currency: 'GBP', amount: 2000}}/>
    );

    expect(wrapper.hasClass('price')).to.equal(true, 'incorrect class name');
    expect(wrapper.find('.amount').text()).to.equal('20', 'incorrect amount');
    expect(wrapper.find('.decimals').length).to.equal(0, 'incorrect decimals');
  });

  it('renders empty component when no price', () => {
    const wrapper = shallow(
      <Price />
    );

    expect(wrapper.text()).to.equal('');
  });
});
