import React from 'react';
import toga from 'toga-component';
import i18n from './i18n.json';
import Copyright from '../copyright';

import './styles.scss';

module.exports = class Footer extends React.Component {
  render() {
    const { locale, one } = this.props;
    const phrases = i18n[locale];
    const t = toga.createT({phrases});
    return (
      <div className="toga-footer">
        {t('WELCOME_TO_FOOTER')}
        <Copyright locale={locale} one={one} />
      </div>
    );
  }
};

