import React from 'react';
import bemHelper from 'react-bem-helper';

import NewsletterSubscribe from '../newsletter-subscribe';
import Accordion from '../accordion';
import MyAccount from '../my-account';
import LinksList from '../links-list';

import CountryAndCurrency from './CountryAndCurrency';
import linksObject from './links';

import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'footer' });
const titleClasses = bem('title');

export default class Footer extends React.Component {

  static propTypes = {
    loggedIn: React.PropTypes.bool,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    sponsoredProductFeature: React.PropTypes.bool,
    country: CountryAndCurrency.propTypes.country,
    currency: CountryAndCurrency.propTypes.currency
  };

  static defaultProps = {
    loggedIn: false,
    sponsoredProductFeature: false
  };

  static childContextTypes = {
    csrf: React.PropTypes.string
  };

  getChildContext() {
    return { csrf: this.props.csrf };
  }

  render() {
    const { loggedIn, name, sponsoredProductFeature, country, currency, className, ...props } = this.props;

    return (
      <div { ...bem(null, null, className) } { ...props } >
        <NewsletterSubscribe locale="en" />
        <h2 className="sr-only">Additional navigation</h2>
        <Accordion { ...bem('navigation') }>
          <div  { ...bem('list', 'myaccount', 'hidden--desktop') }>
            <Accordion.Header { ...titleClasses }>
              { name ? name :'my account' }
            </Accordion.Header>
            <Accordion.Panel { ...bem('content', 'slim') }>
              <MyAccount loggedIn={loggedIn} />
            </Accordion.Panel>
          </div>
          <div { ...bem('list', 'shopping') } >
            <Accordion.Header { ...titleClasses }>
              shopping with us
            </Accordion.Header>
            <Accordion.Panel { ...bem('content', 'slim', 'visible--desktop') }>
              <LinksList links={linksObject.shopping} { ...bem('links') } />
            </Accordion.Panel>
          </div>
          <div { ...bem('list', 'selling') } >
            <Accordion.Header { ...titleClasses }>
              selling with us
            </Accordion.Header>
            <Accordion.Panel { ...bem('content', 'slim', 'visible--desktop') }>
              <LinksList links={linksObject.selling} { ...bem('links') } />
            </Accordion.Panel>
          </div>
          <div { ...bem('list', 'about-us') } >
            <Accordion.Header { ...bem('title') }>
              about us
            </Accordion.Header>
            <Accordion.Panel { ...bem('content', 'slim', 'visible--desktop') }>
              <LinksList links={linksObject.about} { ...bem('links') } />
              { (sponsoredProductFeature)
                ? <LinksList links={ linksObject.sponsored } { ...bem('links') } />
                : null
              }
            </Accordion.Panel>
          </div>
          <div { ...bem('list', 'currency') } >
            <Accordion.Header { ...bem('title') }>
              region
            </Accordion.Header>
            <Accordion.Panel { ...bem('content') }>
              <CountryAndCurrency country={country} currency={currency}/>
            </Accordion.Panel>
          </div>
          <div { ...bem('list', 'social') }>
            <Accordion.Header { ...bem('title', 'social', 'hidden--mobile') }>
              keep in touch
            </Accordion.Header>
            <Accordion.Panel { ...bem('content', null, 'visible--desktop') }>
              <LinksList links={ linksObject.social } linkClass="social-link" { ...bem('social-links') } />
            </Accordion.Panel>
          </div>
        </Accordion>
      </div>
    );
  }
}
