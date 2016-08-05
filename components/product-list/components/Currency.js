import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

const bem = bemHelper({ prefix: 'toga-', name: 'currency' });

class Currency extends Component {
  static symbols = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    AUD: '$'
  };

  render() {
    const symbol = Currency.symbols[this.props.code];

    return <div {...bem()}>{symbol}</div>;
  }
}

Currency.propTypes = {
  code: PropTypes.string.isRequired
};

export default Currency;
