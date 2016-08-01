import React from 'react';
import BemHelper from 'react-bem-helper';
import i18n from './i18n.json';

import { Field, Label } from '../form';
import './styles.scss';

const bem = new BemHelper({ prefix: 'toga-', name: 'newsletter-subscribe'});

export default class NewsletterSubscribe extends React.Component {
  render() {
    const { locale } = this.props;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    return (
      <div { ...bem() }>
        <p { ...bem('slogan', null, 'hidden--mobile') }>{t('UNIQUE_INSPIRING')}</p>
        <p { ...bem('cta', null, 'hidden--desktop') }>{t('SIGN_UP')}</p>
        <form { ...bem('form') } method="post" action="/communication-preference" >
          <Label { ...bem('label', null, 'sr-only') } >{t('ENTER_EMAIL')}</Label>
          <Field { ...bem('input') } type="text" inline placeholder={t('ENTER_EMAIL')}/>
          <Field { ...bem('submit') } type="submit" inline size="medium" >{t('SUBSCRIBE')}</Field>
        </form>
      </div>
    );
  }
}
