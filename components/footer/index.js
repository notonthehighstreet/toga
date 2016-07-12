import React from 'react';
import NewsletterSubscribe from '../newsletter-subscribe';
import linksObject from './links';
import Accordion from './FooterAccordion';
import MyAccountContent from './MyAccountContent';
import CountryAndCurrency from './CountryAndCurrency';
import FooterLinks from './FooterLinks';

import './styles.scss';

module.exports = class Footer extends React.Component {
  render() {
    const { loggedIn, name, sponsoredProductFeature} = this.props;

    return (
      <div className="toga-footer">
        <NewsletterSubscribe locale="en" />
        <div className="toga-footer__navigation">
          <Accordion title={name ? name :'my account'} className="toga-footer__list--myaccount"><MyAccountContent loggedIn={loggedIn} /></Accordion>
          <Accordion title="shopping with us" links={linksObject.shopping} >
            <FooterLinks links={linksObject.shopping} />
          </Accordion>
          <Accordion title="selling with us" links={linksObject.selling} >
            <FooterLinks links={linksObject.selling} />
          </Accordion>
          <Accordion title="about us">
            <FooterLinks links={linksObject.about} />
            { (sponsoredProductFeature)
                  ? <FooterLinks links={linksObject.sponsored} />
                  : null
              }
          </Accordion>
          <Accordion title="select country and currency" className="toga-footer__list--currency">
              <CountryAndCurrency />
          </Accordion>
          <ConnectMenu />
        </div>
      </div>
    );
  }
};

const ConnectMenu = () =>
  <div id="connect" className="toga-footer__list toga-footer__list--social">
    <h2 className="toga-footer__header toga-footer__header--social">keep in touch</h2>

    <div className="toga-footer__links--social">
      <a href="http://www.facebook.com/notonthehighstreet" rel="nofollow" target="_blank"
         className="social_link social_link--facebook">
        <span className="image">visit us on Facebook</span>
      </a>

      <a href="http://twitter.com/notonthehighst" rel="nofollow" target="_blank"
         className="social_link social_link--twitter">
        <span className="image">tweet with us on Twitter</span>
      </a>

      <a href="http://blog.notonthehighstreet.com/" className="social_link social_link--blog">
        <span className="image">read our Blog</span>
      </a>

      <a href="http://pinterest.com/notonthehighst/" className="social_link social_link--pinterest">
        <span className="image">see inspiration on Pinterest.</span>
      </a>

      <a href="http://instagram.com/notonthehighstreet" rel="nofollow" target="_blank"
         className="social_link social_link--instagram">
        <span className="image">view us on Instagram</span>
      </a>

      <a href="https://plus.google.com/110256235424588800889" rel="nofollow" target="_blank"
         className="social_link social_link--google_plus">
        <span className="image">follow us on Google Plus</span>
      </a>
    </div>
  </div>;
