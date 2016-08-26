import helper from 'tests/helper';
import React from 'react';
import {shallow} from 'enzyme';
import ToggleProductButton from './ToggleProductButton';

const {expect, sandbox, chance} = helper;

describe('Toggle product button component', () => {
  beforeEach(() => {
    sandbox.reset();
  });
  it('clicking calls toggleProducts', () => {
    const listId = chance.word();
    const productCode = chance.natural();

    const toggleProductsSpy = sandbox.spy();
    const wrapper = shallow(
      <ToggleProductButton listId={listId} productCode={productCode} productRemoved={false} actions={{toggleProduct: toggleProductsSpy}} />
    );

    wrapper.simulate('click');
    expect(toggleProductsSpy.withArgs(
      {
        listId,
        productCode: productCode,
        productRemoved: false
      }, {
        event: 'toggleProduct',
        productCode: productCode,
        triggerSource: 'heart'
      }
    )).to.have.been.calledOnce;
  });

  it('renders active image when marked as favourite', () => {
    const listId = chance.word();
    const productCode = chance.natural();
    const wrapper = shallow(
      <ToggleProductButton listId={listId} productCode={productCode} productRemoved={false} actions={{}} />
    );

    expect(wrapper.hasClass('toga-toggle-product-button--active')).to.equal(true, 'expected the component to have \'active\' class');
  });

  it('renders inactive image when marked as removed', () => {
    const listId = chance.word();
    const productCode = chance.natural();
    const wrapper = shallow(
      <ToggleProductButton listId={listId} productCode={productCode} productRemoved={true} actions={{}} />
    );

    expect(wrapper.hasClass('toga-toggle-product-button--inactive')).to.equal(true, 'expected the component to have \'inactive\' class');
  });
});
