import React from 'react';
import BemHelper from 'react-bem-helper';
import i18n from './i18n.json';

import { Field, Label } from '../form';
import './styles.scss';

const bem = new BemHelper({ prefix: 'toga-', name: 'newsletter-subscribe'});
const inputName = 'newsletter-subscribe-input';
const locales = Object.keys(i18n);
let input;

export default class NewsletterSubscribe extends React.Component {

  static propTypes = {
    locale: React.PropTypes.oneOf(locales)
  };

  static defaultProps = {
    locale: locales[0]
  };

  constructor(props) {
    super(props);
    this.state = {
      hasEmailText: false
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.onChange(input);
  }

  onChange(node) {
    this.setState({ hasEmailText: !!node.value });
  }

  render() {
    const { locale } = this.props;
    const { hasEmailText } = this.state;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;

    return (
      <div { ...bem() }>
        <p { ...bem('slogan', null, 'hidden--mobile') }>{t('UNIQUE_INSPIRING')}</p>
        <p { ...bem('cta', null, 'hidden--desktop') }>{t('SIGN_UP')}</p>
        <form { ...bem('form') } method="post" action="/communication-preference" >
          <Field { ...bem('input', { 'has-text' : hasEmailText }) } onChange={(e) => this.onChange(e.target) }
                 tref= { (node) => input = node } name={inputName} id={inputName} type="email"
          />
          <Label { ...bem('label') } htmlFor={ inputName } >{t('ENTER_EMAIL')}</Label>
          <Field { ...bem('submit') } type="submit" size="medium" >{t('SUBSCRIBE')}</Field>
        </form>
      </div>
    );
  }
}
