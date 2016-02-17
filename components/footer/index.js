const React = require('react');

module.exports = ({locale}) => {
  const phrases = require('./i18n.json')[locale];
  const t = require('toga-component').createT({phrases});
  const Copyright = require('../copyright')({locale});

  return React.createClass({
    render() {
      return (
        <div className="footer">
          {t('WELCOME_TO_FOOTER')}
          <Copyright/>
        </div>
      );
    }
  });
};
