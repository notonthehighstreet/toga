import React from 'react';
import i18n from './i18n.json';

import './styles.scss';

module.exports = class NewsletterSubscribe extends React.Component {
  render() {
    const { locale } = this.props;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    return (
      <div className="toga-newsletter-subscribe">
        <p className="newsletter-subscribe__slogan">{t('UNIQUE_INSPIRING')}</p>
        <p className="newsletter-subscribe__cta">{t('SIGN_UP')}</p>
        <div className="form-wrapper">
          <form className="newsletter-subscribe__form" action="post" action="/communication-preference" >
            <input type="text" className="n-input n-input--subscribe" placeholder={t('ENTER_EMAIL')}/>
            <button className="n-button n-button--primary n-button--medium newsletter-subscribe__form__submit" type="submit">{t('SUBSCRIBE')}</button>
          </form>
        </div>
      </div>
    );
  }
};

