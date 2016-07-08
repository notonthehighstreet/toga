import React from 'react';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import './styles.scss';

const priceBem = new BEMHelper({  prefix: 'toga-', name: 'price' });

const currencyUnit = {
  'GBP' : '£',
  'USD' : '$',
  'AUD' : '$',
  'EUR' : '€'
};

const Price =  ({ price, currency, className, ...props }) => {
  const classes = classNames(priceBem('group', currency).className, className);
  return (
    <span className={ classes } data-base-price={ price.base } data-current-price={ price.current } { ...props } >
      <span { ...priceBem('unit') }>{ currencyUnit[currency] }</span>
      <span { ...priceBem('major') }>{ price.current }</span>
      <span { ...priceBem('decimal') }></span>
    </span>
  );
};

const Prices = ({ gbp, aud, eur, usd, className, ...props }) => {
  const classes = classNames(priceBem(null).className, className);
  return (
    <span className={ classes } { ...props } >
      <Price currency="GBP" price={ gbp } />
      <Price currency="AUD" price={ aud } className="hidden" />
      <Price currency="EUR" price={ eur } className="hidden" />
      <Price currency="USD" price={ usd } className="hidden" />
    </span>
  );
};

module.exports = Prices;
