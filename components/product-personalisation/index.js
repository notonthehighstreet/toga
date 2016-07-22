import React from 'react';
import BEMHelper from 'react-bem-helper';

import Field from '../form';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'toga-', name: 'product-personalisation' });

export default class ProductPersonalisation extends React.Component {

  render() {
    const { title, qty, setQty, addToBasket, formFields, ...props } = this.props;
    return (
      <form { ...bem() } { ...props }>
        <h2 { ...bem('title') }>{ title }</h2>
        { formFields.map((field, i) =>
          <Field key={ i } { ...{...field}} />)
        }
        <Field { ...bem(qty) } type='number' label="quantity" name="qty" value={ qty } onInput={ setQty } inline/>
        <Field type="submit" name="add-to-basket" onClick={ addToBasket } size="large" inline>Add to basket</Field>
      </form>
    );
  }
}
