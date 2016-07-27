import React, {PropTypes, Component} from 'react';
import Currency from './Currency';

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
      <div className="price">
        <Currency code={currency}/>
        <div className="amount">{decimalisedAmount}</div>
        { hasDecimals &&
        <div className="decimals">.{decimals}</div>
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
