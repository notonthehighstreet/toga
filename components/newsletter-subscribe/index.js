import React from 'react';
import BemHelper from 'react-bem-helper';
import i18n from './i18n.json';

import { Field, Label } from '../form';
import './styles.scss';

const bem = new BemHelper({ prefix: 'toga-', name: 'newsletter-subscribe'});

export default class NewsletterSubscribe extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hasEmailText: false
    };
    this.onBlur = this.onBlur.bind(this)
  }

  onBlur(e){
    this.setState({ hasEmailText : !!e.currentTarget.value })
  }

  render() {
    const { locale } = this.props;
    const { hasEmailText } = this.state;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    const name = 'newsletter-subscribe-input';

    return (
      <div { ...bem() }>
        <p { ...bem('slogan', null, 'hidden--mobile') }>{t('UNIQUE_INSPIRING')}</p>
        <p { ...bem('cta', null, 'hidden--desktop') }>{t('SIGN_UP')}</p>
        <form { ...bem('form') } method="post" action="/communication-preference" >
          <Field { ...bem('input', { 'has-text' : hasEmailText }) } name={name} id={name} type="text" inline onBlur={this.onBlur}/>
          <Label { ...bem('label') } htmlFor={ name } >{t('ENTER_EMAIL')}</Label>
          <Field { ...bem('submit') } type="submit" inline size="medium" >{t('SUBSCRIBE')}</Field>
        </form>
      </div>
    );
  }
}
