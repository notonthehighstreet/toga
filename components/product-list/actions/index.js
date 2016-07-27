import {createAction} from 'redux-actions';
import {bind} from 'redux-effects';
import {fetch} from 'redux-effects-fetch';

const url = ({listId, productCode}) => {
  return `/api/v1/lists/${listId}/products/${productCode}`;
};

export const productToggled = createAction('PRODUCT_TOGGLED');
export const gtm = createAction('EFFECT_GTM');

const fetchAction = (product) => {
  return (
    bind(fetch(url(product), {
      method: product.productRemoved ? 'PUT' : 'DELETE'
    }))
  );
};

export const toggleProduct = (product, gtmMeta) => {
  const actions = [
    fetchAction(product),
    productToggled(product)
  ];

  gtmMeta.action = `${product.productRemoved ? 'Add' : 'Remove'}`;
  actions.push(gtm(gtmMeta));

  return actions;
};

export {gtm};
