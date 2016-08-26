import {createAction} from 'redux-actions';
import {bind} from 'redux-effects';
import {fetch} from 'redux-effects-fetch';

const url = ({listId, productCode}) => {
  return `/api/lists/${listId}/products/${productCode}`;
};

export const productToggled = createAction('PRODUCT_TOGGLED');

const fetchAction = (product) => {
  return (
    bind(fetch(url(product), {
      method: product.productRemoved ? 'PUT' : 'DELETE'
    }))
  );
};

export const toggleProduct = (product) => {
  const actions = [
    fetchAction(product),
    productToggled(product)
  ];
  return actions;
};
