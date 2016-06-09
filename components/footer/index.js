import React from 'react';
import toga from 'toga-component';
import i18n from './i18n.json';
import Copyright from '../copyright';

class Footer extends React.Component {
  render() {
    const { locale } = this.props;
    const phrases = i18n[locale];
    const t = toga.createT({phrases});
    return (
      <div className="footer">
        {t('WELCOME_TO_FOOTER')}
        <Copyright locale={locale} />
      </div>
    );
  }
}

module.exports = toga.wrapComponent(Footer, 'footer');
