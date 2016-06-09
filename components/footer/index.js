import React from 'react';
import { createT } from 'toga-component';
import i18n from './i18n.json';
import Copyright from '../copyright';

module.exports = React.createClass({
  render() {
    const { locale } = this.props;
    const phrases = i18n[locale];
    const t = createT({phrases});
    return (
      <div className="footer">
        {t('WELCOME_TO_FOOTER')}
        <Copyright locale={locale} />
      </div>
    );
  }
});
