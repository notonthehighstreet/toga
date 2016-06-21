import React from 'react';
import i18n from './i18n.json';
import Copyright from '../copyright';

import './styles.scss';

module.exports = class Footer extends React.Component {
  render() {
    const { locale, one } = this.props;
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    return (
      <div className="toga-footer">
        {t('WELCOME_TO_FOOTER')}
        <Copyright locale={locale} one={one} />
      </div>
    );
  }
};

