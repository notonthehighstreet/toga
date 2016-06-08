const React = require('react');
const togaComponent = require('toga-component');
const i18n = require('./i18n.json');
const Copyright = require('../copyright');

module.exports = React.createClass({
  render() {
    const { locale } = this.props;
    const phrases = i18n[locale];
    const t = togaComponent.createT({phrases});
    return (
      <div className="footer">
        {t('WELCOME_TO_FOOTER')}
        <Copyright locale={locale} />
      </div>
    );
  }
});
