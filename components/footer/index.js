import React from 'react';
import Copyright from '../copyright';
import linksObject from './links';
import FooterAccordion from './FooterAccordion';

import './styles.scss';

module.exports = class Footer extends React.Component {
  render() {
    const {locale, one} = this.props;
    return (
      <div className="toga-footer">
        <div className="toga-footer__navigation">
          <MyAccountMenu />
          <FooterAccordion title="shopping with us" links={linksObject.shopping} />
          <FooterAccordion title="selling with us" links={linksObject.selling} />
          <FooterAccordion title="about us" links={linksObject.about}/>
          <CountryCurrencyToggle />
          <ConnectMenu />
        </div>

        <Copyright locale={locale} one={one}/>
      </div>
    );
  }
};

const MyAccountMenu = () =>
<div className="toga-footer__list toga-footer__list--myaccount">
  <h2 className="toga-footer__header">my account</h2>
  <ul className="toga-footer__links hidden">
    <li>TODO: loggedIn logged-out links</li>
  </ul>
</div>;

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

const CountryCurrencyToggle = () =>
  <div className="toga-footer__list--currency">
    <h2 className="toga-footer__header ">select country and currency</h2>
    <ul className="toga-footer__links hidden">
      <label>select country and currency</label>
      <select>
        <option selected="selected" value="GB-1">Mainland UK</option>
        <option value="GB-2">Highlands &amp; Islands of Scotland</option>
        <option value="GB-9">Northern Ireland</option>
        <option value="GB-10">Other UK Islands</option>
      </select>
    </ul>
  </div>;

