import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

import Currency from '../Currency/Currency';

import './price.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'price' });

export default class Price extends Component {

  static propTypes = {
    price: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  };

  static getWhole(value, decimalPlaces) {
    return value.substring(0, value.length - decimalPlaces) || 0;
  }

  static getDecimals(value, decimalPlaces) {
    return value.substring(value.length - decimalPlaces, value.length);
  }

  render() {
    const {price} = this.props;

    if (!price) {
      return null;
    }

    const {amount, currency} = price;
    const amountStr = String(amount);

    const decimalPlaces = 2;
    const decimalisedAmount = Price.getWhole(amountStr, decimalPlaces);
    const decimals = Price.getDecimals(amountStr, decimalPlaces);
    const hasDecimals = amount % Math.pow(10, decimalPlaces) !== 0;

    return (
      <strong {...bem()}>
        <Currency code={currency}/>
        <div {...bem('amount')}>{decimalisedAmount}</div>
        { hasDecimals &&
        <div {...bem('decimals')}>.{decimals}</div>
        }
      </strong>
    );
  }
}
