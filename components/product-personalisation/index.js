import React from 'react';
import Field from '../form';

import './styles.scss';

module.exports =  ({ title, qty, setQty, addToBasket, formFields, ...props }) => {
  return (
    <form className="toga-product-personalisation" { ...props }>
      <h2 className="toga-product-personalisation__title">{ title }</h2>
      { formFields.map((field, i) =>
          <Field key={ i } { ...{ ...field }} />)
      }
      <Field className="toga-product-personalisation__qty"
             type='number' label="quantity" name="qty" value={ qty } onChange={ setQty } inline />
      <Field type="submit" value="Add to basket" name="add-to-basket" onClick={ addToBasket } size="large" inline />
    </form>
  );
};
