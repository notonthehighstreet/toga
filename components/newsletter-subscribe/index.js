import React from 'react';
import toga from 'toga-component';
import i18n from './i18n.json';

import './styles.scss';

module.exports = class NewsletterSubscribe extends React.Component {
  render() {
    const { locale } = this.props;
    const t = toga.createT({phrases: i18n[locale]});
    return (
      <div className="toga-newsletter-subscribe">
        <p className="slogan">{t('UNIQUE_INSPIRING')}</p>
        <p className="cta">{t('SIGN_UP')}</p>
        <div className="form-wrapper">
          <form className="form" action="post" action="/communication-preference">
            <input className="input" type="text" placeholder={t('ENTER_EMAIL')}/>
            <button className="button primary medium" type="submit">{t('SUBSCRIBE')}</button>
          </form>
        </div>
      </div>
    );
  }
};

