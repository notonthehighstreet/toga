import helper from '../../../../../../tests/helper';
import React from 'react';
import {shallow, mount} from 'enzyme';
import Price from './Price';

const {expect} = helper;

describe('Price component', () => {
  it('renders decimals', () => {
    const wrapper = mount(
      <Price price={{currency: 'GBP', amount: 1699}}/>
    );

    expect(wrapper.find('.toga-price').text()).to.equal('£16.99', 'incorrect value');
    expect(wrapper.find('.toga-price__amount').text()).to.equal('16', 'incorrect amount');
    expect(wrapper.find('.toga-price__decimals').text()).to.equal('.99', 'incorrect decimals');

  });

  it('renders whole values', () => {
    const wrapper = mount(
      <Price price={{currency: 'GBP', amount: 2000}}/>
    );

    expect(wrapper.find('.toga-price').text()).to.equal('£20', 'incorrect value');
    expect(wrapper.find('.toga-price__amount').text()).to.equal('20', 'incorrect amount');
    expect(wrapper.find('.toga-price__decimals').length).to.equal(0, 'incorrect decimals');
  });

  it('renders 99p as £0.99', () => {
    const wrapper = mount(
      <Price price={{currency:'GBP', amount:99}} />
    );

    expect(wrapper.find('.toga-price').text()).to.equal('£0.99', 'incorrect value');
    expect(wrapper.find('.toga-price__amount').text()).to.equal('0', 'incorrect amount');
    expect(wrapper.find('.toga-price__decimals').text()).to.equal('.99', 'incorrect decimals');
  });

  it('renders empty component when no price', () => {
    const wrapper = shallow(
      <Price />
    );

    expect(wrapper.text()).to.equal('');
  });
});
