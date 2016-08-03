import helper from 'tests/spec/helper';
import React from 'react';
import {shallow} from 'enzyme';
import List from '../../components/List';
import Product from '../../components/Product';
import createFakeProduct from '../helpers/createFakeProduct';
import createSanitisedProduct from '../helpers/createSanitisedProduct';

const {chance, expect} = helper;
const createProductList = (number) => new Array(number).fill().map(() => createSanitisedProduct(createFakeProduct().product));

describe('Product list component', () => {
  it('renders list of products', () => {
    const numberOfProducts = chance.integer({min: 2, max: 20});
    const someProducts = createProductList(numberOfProducts);
    const wrapper = shallow(
      <List
        products={someProducts}
        listId={chance.word()}
        actions={{toggleProduct: () => {}}}/>
    );

    expect(wrapper.find(Product).length).to.equal(numberOfProducts);
  });
});
