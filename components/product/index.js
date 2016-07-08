import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import Prices from '../prices';
import ProductPersonalisation from '../product-personalisation';

import './styles.scss';

const productBem = new BEMHelper({  prefix: 'toga-', name: 'product' });

const personalisationProps = {
  'title':'Personalise',
  'formFields':[
    {'type':'select', 'name':'colour', 'label': 'Colour', 'mandatory':'true', 'options':[ 'blue', 'green' ]},
    {'type':'select', 'name':'wrap', 'label': 'Gift Wrap Options', 'mandatory':'true', 'options':[
      { label: 'silver', value: 'expensive'}, { label: 'white', value: 'cheap'}
    ]},
    {'type':'text', 'name': 'front', 'label':'Front Personalisation', 'placeholder': '15 letters'}
  ]
};

const rates = {
  aud: 1.71774,
  usd: 1.29476,
  eur: 1.17275
};

module.exports = class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      price: 10,
      qty: 1
    };
    this.updateQty = this.updateQty.bind(this);
  }

  getPrice(rate) {
    return this.props.price * rate * this.state.qty;
  }
  
  updateQty(e) {
    this.setState({
      qty: e.currentTarget.value
    });
  }

  render() {
    const { className, ...props } = this.props;
    const { qty, price } = this.state;
    const classes = classNames(productBem(null).className, className);
    return (
      <div className={ classes } { ...props } >
        <Prices { ...{
          gbp: price * qty,
          aud: this.getPrice(rates.aud),
          eur: this.getPrice(rates.eur),
          usd: this.getPrice(rates.usd) }
        } />
        <ProductPersonalisation { ...personalisationProps } qty={ qty } setQty={ this.updateQty } />
      </div>
    );
  }
};
