import React from 'react';
import i18n from './i18n.json';

import './styles.scss';

export default class NewsletterSubscribe extends React.Component {
  render() {
    const { locale } = this.props;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    return (
      <div className="toga-newsletter-subscribe">
        <p className="newsletter-subscribe__slogan hidden--mobile">{t('UNIQUE_INSPIRING')}</p>
        <p className="newsletter-subscribe__cta hidden--desktop">{t('SIGN_UP')}</p>
        <form className="newsletter-subscribe__form clearfix" method="post" action="/communication-preference" >
          <input type="text" className="n-input newsletter-subscribe__input" placeholder={t('ENTER_EMAIL')}/>
          <button className="n-button n-button--primary n-button--medium newsletter-subscribe__submit" type="submit">{t('SUBSCRIBE')}</button>
        </form>
      </div>
    );
  }
}
