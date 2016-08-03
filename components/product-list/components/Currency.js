import React, {PropTypes, Component} from 'react';

class Currency extends Component {
  static symbols = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    AUD: '$'
  };

  render() {
    const symbol = Currency.symbols[this.props.code];

    return <div className="currency">{symbol}</div>;
  }
}

Currency.propTypes = {
  code: PropTypes.string.isRequired
};

export default Currency;
