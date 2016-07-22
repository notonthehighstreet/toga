import React from 'react';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'toga-', name: 'price' });

const currencyUnit = {
  'GBP' : '£',
  'USD' : '$',
  'AUD' : '$',
  'EUR' : '€'
};

const Price =  ({ price, currency, className, ...props }) => {
  const classes = bem('group', currency, className);
  return (
    <span className={ classes } { ...props } >
      <span { ...bem('unit') }>{ currencyUnit[currency] }</span>
      <span { ...bem('major') }>{ price }</span>
      <span { ...bem('decimal') }></span>
    </span>
  );
};

const Prices = ({ gbp, aud, eur, usd, className, ...props }) => {
  const classes = bem(null, null, className);
  return (
    <span className={ classes } { ...props } >
      <Price currency="GBP" price={ gbp } />
      <Price currency="AUD" price={ aud } className="hidden" />
      <Price currency="EUR" price={ eur } className="hidden" />
      <Price currency="USD" price={ usd } className="hidden" />
    </span>
  );
};

export default Prices;
