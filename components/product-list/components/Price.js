import React, {PropTypes, Component} from 'react';
import Currency from './Currency';
import bemHelper from 'react-bem-helper';
import '../styles/components/price.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'price' });

class Price extends Component {
  static getWhole(value, decimalPlaces) {
    return value.substring(0, value.length - decimalPlaces);
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
      <div {...bem()}>
        <Currency code={currency}/>
        <div {...bem('amount')}>{decimalisedAmount}</div>
        { hasDecimals &&
        <div {...bem('decimals')}>.{decimals}</div>
        }
      </div>
    );
  }
}

Price.propTypes = {
  price: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  })
};

export default Price;
