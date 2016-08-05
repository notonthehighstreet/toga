import React from 'react';

import Button from '../button';
import iso from './iso';

import '../form/styles.scss';
import countries from './countries.json';

const CountryOption = ({code, name}) => <option value={code}>{name}</option>;

class CountryAndCurrency extends React.Component {
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

    iso.fetch(`https://${window.location.host}/geo`, {
      method: 'POST',
      body: this.buildRequestBody()
    })
    .then(function() {
      location.reload();
    })
    .catch(()=> {
      location.reload();
    });
  }

  buildRequestBody() {
    return {
      utf8: true,
      authenticity_token: this.context.csrf, // eslint-disable-line
      extended_country_code: this.state.country, // eslint-disable-line
      currency: this.state.currency
    };
  }

  render() {
    const ukCountryOptions = countries.uk.map((country, i) => <CountryOption key={i} {...country} /> );
    const otherCountryOptions = countries.other.map((country, i) => <CountryOption key={i} {...country} /> );
    return (
      <div className="n-form toga-country-currency">
        <div className="n-form__row toga-country-currency__country">
          <label className="n-form__label">set my region to:</label>
          <select defaultValue={this.state.country} onChange={this.onCountryChanged} className="n-form__field n-form__field--select" name="extended_country_code">
            <optgroup label="United Kingdom">
              {ukCountryOptions}
            </optgroup>
            <optgroup label="Other countries">
              {otherCountryOptions}
            </optgroup>
          </select>
        </div>
        <div className="n-form__row toga-country-currency__currency">
          <label className="n-form__label">set my currency to:</label>
          <select defaultValue={this.state.currency} onChange={this.onCurrencyChanged} className="n-form__field n-form__field--select" name="currency">
            <option value="GBP">£ GBP</option>
            <option value="AUD">$ AUD</option>
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
          </select>
        </div>
        <Button onClick={this.onSubmitted} size="medium" fullWidth type="submit">update</Button>
      </div>
    );
  }
}

export default CountryAndCurrency;

CountryAndCurrency.contextTypes = {csrf: React.PropTypes.string};
