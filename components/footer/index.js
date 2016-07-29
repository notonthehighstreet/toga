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
const navClasses = bem('navigation');
const titleClasses = bem('title');

export default class Footer extends React.Component {
  render() {
    const { loggedIn, name, sponsoredProductFeature, className, ...props } = this.props;
    const classes = bem(null, null, className);
    const myAccountClasses = bem('list', 'myaccount', 'hidden--desktop');
    const currencyClasses = bem('list', 'currency');
    const socialTitleClasses = bem('title', 'social', 'hidden--mobile');

    return (
      <div className={ classes } { ...props } >
        <NewsletterSubscribe locale="en" />
        <div { ...navClasses }>
          <Accordion { ...myAccountClasses } >
            <Accordion.Title { ...titleClasses }>
              { name ? name :'my account' }
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'myaccount') }>
              <MyAccount loggedIn={loggedIn} />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'shopping') } >
            <Accordion.Title { ...titleClasses }>
              shopping with us
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'slim') }>
              <LinksList links={linksObject.shopping} { ...bem('links') } />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'selling') } >
            <Accordion.Title { ...titleClasses }>
              selling with us
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'slim') }>
              <LinksList links={linksObject.selling} { ...bem('links') } />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'about-us') } >
            <Accordion.Title { ...titleClasses }>
              about us
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'slim') }>
              <LinksList links={linksObject.about} { ...bem('links') } />
              { (sponsoredProductFeature)
                ? <LinksList links={ linksObject.sponsored } { ...bem('links') } />
                : null
              }
            </Accordion.Content>
          </Accordion>
          <Accordion { ...currencyClasses } >
            <Accordion.Title { ...titleClasses }>
              region
            </Accordion.Title>
            <Accordion.Content { ...bem('content') }>
              <CountryAndCurrency />
            </Accordion.Content>
          </Accordion>
          <div id="connect" { ...bem('list', 'social') }>
            <h2 { ...socialTitleClasses }>keep in touch</h2>
            <LinksList links={ linksObject.social } linkClass="social-link" { ...bem('social-links') } />
          </div>
        </div>
      </div>
    );
  }
}
