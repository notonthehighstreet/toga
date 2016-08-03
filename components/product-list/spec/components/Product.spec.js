import helper from 'tests/spec/helper';
import React from 'react';
import {shallow} from 'enzyme';
import Product from '../../components/Product';
import createFakeProduct from '../helpers/createFakeProduct';
import createSanitisedProduct from '../helpers/createSanitisedProduct';

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

    expect(wrapper.hasClass('removed')).to.be.false;
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

    expect(removedWrapper.hasClass('removed')).to.be.true;
  });

  it('product image links to product page', () => {
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}}} />
    );

    expect(wrapper.find('.image-link').prop('href')).to.equal(product.url);
  });

  it('partner name links to partner page', () => {
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}}} />
    );

    expect(wrapper.find('.partner-link').prop('href')).to.equal(product.partnerUrl);
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

    wrapper.find('.remove-button').simulate('click');
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

  it('clicking the product image fires a GTM event', () => {
    const gtmSpy = sandbox.spy();
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}, gtm: gtmSpy}} />
    );

    wrapper.find('.image-link').simulate('click');
    expect(gtmSpy.withArgs({
      event: 'productClick',
      productCode: product.code
    })).to.have.been.calledOnce;
  });

  it('clicking the product title fires a GTM event', () => {
    const gtmSpy = sandbox.spy();
    const product = createSanitisedProduct(createFakeProduct().product);
    const wrapper = shallow(
      <Product
        product={product}
        listId={chance.word()}
        actions={{toggleProduct: () => {}, gtm: gtmSpy}} />
    );

    wrapper.find('.title-link').simulate('click');
    expect(gtmSpy.withArgs({
      event: 'productClick',
      productCode: product.code
    })).to.have.been.calledOnce;
  });
});
