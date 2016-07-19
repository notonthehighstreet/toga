import React from 'react';
import bemHelper from 'react-bem-helper';
import classnames from 'classnames';

import NewsletterSubscribe from '../newsletter-subscribe';
import Accordion from '../accordion';
import MyAccount from '../my-account';
import LinksList from '../links-list';

import CountryAndCurrency from './CountryAndCurrency';
import linksObject from './links';

import './styles.scss';

import '../../packages/toga-component/styles/styleguide.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'footer' });
const navClass = bem('navigation').className;
const titleClass = bem('title').className;

export default class Footer extends React.Component {
  render() {
    const { loggedIn, name, sponsoredProductFeature, className, ...props } = this.props;
    const classes = classnames(bem().className, className);
    const myAccountClassName = classnames('hidden--desktop', bem('list', 'myaccount').className);
    const currencyClassName = classnames(bem('list', 'currency').className);
    const socialTitleClassName = classnames('hidden--mobile', bem('title', 'social').className);

    return (
      <div className={ classes } { ...props } >
        <NewsletterSubscribe locale="en" />
        <div className={ navClass }>
          <Accordion className={ myAccountClassName } >
            <Accordion.Title className={ titleClass }>
              { name ? name :'my account' }
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'myaccount') }>
              <MyAccount loggedIn={loggedIn} />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'shopping') } >
            <Accordion.Title className={ titleClass }>
              shopping with us
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'slim') }>
              <LinksList links={linksObject.shopping} { ...bem('links') } />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'selling') } >
            <Accordion.Title className={ titleClass }>
              selling with us
            </Accordion.Title>
            <Accordion.Content { ...bem('content', 'slim') }>
              <LinksList links={linksObject.selling} { ...bem('links') } />
            </Accordion.Content>
          </Accordion>
          <Accordion { ...bem('list', 'about-us') } >
            <Accordion.Title className={ titleClass }>
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
          <Accordion className={ currencyClassName } >
            <Accordion.Title className={ titleClass }>
              region
            </Accordion.Title>
            <Accordion.Content { ...bem('content') }>
              <CountryAndCurrency />
            </Accordion.Content>
          </Accordion>
          <div id="connect" { ...bem('list', 'social') }>
            <h2 className={ socialTitleClassName }>keep in touch</h2>
            <LinksList links={ linksObject.social } { ...bem('social-links') } />
          </div>
        </div>
      </div>
    );
  }
}
