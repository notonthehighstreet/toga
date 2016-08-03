import helper from 'tests/spec/helper';
import productsReducer from '../../reducers/products';

const {expect, chance} = helper;

describe('Products reducer', () => {
  it('remove product', () => {
    const code = chance.natural();
    const prevState = [{code: code, removed: false}];
    const nextState = productsReducer(prevState, {
      type: 'PRODUCT_TOGGLED',
      payload: {productCode: code}
    });

    expect(nextState).to.deep.equal([{code: code, status: 'toggled', removed: true}], 'incorrect state: expected \'removed\' to have been toggled to true');
  });

  it('add back product', () => {
    const code = chance.natural();
    const prevState = [{code: code, removed: true}];
    const nextState = productsReducer(prevState, {
      type: 'PRODUCT_TOGGLED',
      payload: {productCode: code}
    });

    expect(nextState).to.deep.equal([{code: code, status: 'toggled', removed: false}], 'incorrect state: expected \'removed\' to have been toggled to false');
  });

  it('state is unchanged when code does not match', () => {
    const prevState = [{code: 123, removed: true}];
    const nextState = productsReducer(prevState, {
      type: 'PRODUCT_TOGGLED',
      payload: {productCode: 456}
    });

    expect(nextState).to.deep.equal(prevState, 'incorrect state: expected state to be unchanged');
  });

});
