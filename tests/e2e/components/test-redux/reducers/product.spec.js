import helper from '../../../../../tests/helper';
import productReducer from '../reducers/product';
import {productToggled} from '../actions';

const {expect, chance} = helper;

describe('Product reducer', () => {
  it('product removed', () => {
    const code = chance.natural();
    const prevState = {code: code, status: '', removed: false};
    const nextState = productReducer(prevState, productToggled({productCode: code}));

    expect(nextState).to.deep.equal({code: code, status: 'toggled', removed: true}, 'incorrect state: expected \'removed\' to have been toggled to true');
  });

  it('product added back', () => {
    const code = chance.natural();
    const prevState = {code: code, status: '', removed: true};
    const nextState = productReducer(prevState, productToggled({productCode: code}));

    expect(nextState).to.deep.equal({code: code, status: 'toggled', removed: false}, 'incorrect state: expected \'removed\' to have been toggled to false');
  });

});
