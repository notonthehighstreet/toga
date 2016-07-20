import React from 'react';
import i18n from './i18n.json';

import { Field } from '../form';
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
          <Field type="text" className="newsletter-subscribe__input" inline placeholder={t('ENTER_EMAIL')}/>
          <Field type="submit" className="newsletter-subscribe__submit" inline size="medium" >{t('SUBSCRIBE')}</Field>
        </form>
      </div>
    );
  }
}
