import React, {PropTypes, Component} from 'react';
import bemHelper from 'react-bem-helper';

const bem = bemHelper({ prefix: 'toga-', name: 'currency' });

export default class Currency extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired
  };

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
