import React from 'react';

import Button from '../button';
import Row from '../form';
import isomorphic from './iso';

import '../form/styles.scss';
import countries from './countries.json';

const CountryOption = ({code, name}) => <option value={code}>{name}</option>;
const currencies = { GBP: '£', AUD: '$', EUR: '€', USD: '$' };
const currencyCodes = Object.keys(currencies);
const countryCodes = [].concat(countries.other.map(c => c.code), countries.uk.map(c => c.code));

class CountryAndCurrency extends React.Component {

  static propTypes = {
    country: React.PropTypes.oneOf(countryCodes),
    currency: React.PropTypes.oneOf(currencyCodes),
    csrf: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    const { country, currency } = props;
    this.state = {
      country: country,
      currency: currency
    };

    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onCurrencyChanged = this.onCurrencyChanged.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);
  }

  onCountryChanged(event) {
    this.setState({country: event.target.value});
  }

  onCurrencyChanged(event) {
    this.setState({currency: event.target.value});
  }

  onSubmitted(event) {
    event.preventDefault();
    isomorphic.fetch({
      method: 'PUT',
      withCredentials: true,
      url: '/geo',
      headers: this.buildRequestHeaders(),
      data: this.buildRequestBody()
    })
    .then(function() {
      location.reload();
    })
    .catch(function() {
      location.reload();
    });
  }

  buildRequestBody() {
    return {
      utf8: true,
      extended_country_code: this.state.country, // eslint-disable-line
      currency: this.state.currency
    };
  }

  buildRequestHeaders() {
    return {
      'X-CSRF-Token': this.props.csrf // eslint-disable-line
    };
  }

  render() {
    const ukCountryOptions = countries.uk.map((country, i) => <CountryOption key={i} {...country} /> );
    const otherCountryOptions = countries.other.map((country, i) => <CountryOption key={i} {...country} /> );
    return (
      <div className="toga-country-currency">
        <Row className="toga-country-currency__country" name="extended_country_code" label="set my region to:"
             type="select" defaultValue={this.state.country} onChange={this.onCountryChanged}>
          <optgroup label="United Kingdom">
            {ukCountryOptions}
          </optgroup>
          <optgroup label="Other countries">
            {otherCountryOptions}
          </optgroup>
        </Row>
        <Row className="toga-country-currency__currency" name="currency" label="set my currency to:"
             type="select" defaultValue={this.state.currency} onChange={this.onCurrencyChanged}
        >
          {currencyCodes.map((currency, i) =>
            <option value={currency} key={`currency-${i}`}>{currencies[currency]} {currency}</option>
          )}
        </Row>
        <Button onClick={this.onSubmitted} size="medium" fullWidth type="submit">update</Button>
      </div>
    );
  }
}

export default CountryAndCurrency;
