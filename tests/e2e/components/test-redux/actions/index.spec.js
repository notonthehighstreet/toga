import {toggleProduct} from './';
import helper from 'tests/helper';

const {chance, expect} = helper;
const findActionPayload = (actions, type) => actions.find(e => e.type === type).payload;

describe('Actions', () => {
  it('creates list of actions when removing a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: false},
      {}
    );

    expect(actual.map(a => a.type)).to.deep.equal(['EFFECT_COMPOSE', 'PRODUCT_TOGGLED']);
  });

  it('creates list of actions when adding a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: true},
      {}
    );

    expect(actual.map(a => a.type)).to.deep.equal(['EFFECT_COMPOSE', 'PRODUCT_TOGGLED']);
  });

  it('creates a fetch effect action when removing a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: false},
      {}
    );

    expect(findActionPayload(actual, 'EFFECT_COMPOSE')).to.deep.equal({
      type: 'EFFECT_FETCH',
      payload: {
        url: `/api/lists/${listId}/products/${code}`,
        params: {
          method: 'DELETE'
        }
      }
    });
  });

  it('creates a fetch effect action when adding a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: true},
      {}
    );

    expect(findActionPayload(actual, 'EFFECT_COMPOSE')).to.deep.equal({
      type: 'EFFECT_FETCH',
      payload: {
        url: `/api/lists/${listId}/products/${code}`,
        params: {
          method: 'PUT'
        }
      }
    });
  });

  it('creates a toggled action when removing a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: false},
      {}
    );

    expect(findActionPayload(actual, 'PRODUCT_TOGGLED')).to.deep.equal({
      listId: listId,
      productCode: code,
      productRemoved: false
    });
  });

  it('creates a toggled action when adding a product', () => {
    const code = chance.natural();
    const listId = chance.natural();
    const actual = toggleProduct(
      {listId: listId, productCode: code, productRemoved: true},
      {}
    );

    expect(findActionPayload(actual, 'PRODUCT_TOGGLED')).to.deep.equal({
      listId: listId,
      productCode: code,
      productRemoved: true
    });
  });
});
