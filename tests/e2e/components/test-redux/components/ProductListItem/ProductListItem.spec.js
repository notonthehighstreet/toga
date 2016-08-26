import helper from 'tests/helper';
import React from 'react';
import {shallow} from 'enzyme';
import Product from './ProductListItem';
import createFakeProduct from '../../spec-helpers/createFakeProduct';
import createSanitisedProduct from '../../spec-helpers/createSanitisedProduct';

const {chance, sandbox, expect} = helper;

describe('Product component', () => {
  beforeEach(() => {
    sandbox.reset();
  });
  it('product should not have \'removed\' class', () => {
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}}} />
    );

    expect(wrapper.hasClass('toga-product-list-item--removed')).to.be.false;
  });

  it('product should have \'removed\' class if it has been removed', () => {
    const product = createSanitisedProduct(createFakeProduct().product);

    product.removed = true;
    const removedWrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}}} />
    );

    expect(removedWrapper.hasClass('toga-product-list-item--removed')).to.be.true;
  });

  it('clicking the \'remove button\' toggles the product', () => {
    const toggleProductSpy = sandbox.spy();
    const listId = chance.word();
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={listId}
        actions={{toggleProduct: toggleProductSpy}} />
    );

    wrapper.find('.toga-product-list-item__remove-button').simulate('click');
    expect(toggleProductSpy.withArgs(
      {
        listId,
        productCode: product.code,
        productRemoved: product.removed
      }, {
        event: 'toggleProduct',
        productCode: product.code,
        triggerSource: 'remove button'
      }
    )).to.have.been.calledOnce;
  });
});
