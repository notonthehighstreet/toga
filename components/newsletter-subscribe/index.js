const React = require('react');
const translations = require('./i18n.json');
const createT = require('toga-component').createT;

module.exports = ({locale}) => {
  const t = createT({phrases: translations[locale]});

  return React.createClass({
    render() {
      return (
        <div>
          <p className="slogan">{t('UNIQUE_INSPIRING')}</p>
          <p className="cta">{t('SIGN_UP')}</p>
          <div className="form-wrapper">
            <form className="form" action="post" action="/communication-preference">
              <input className="input" type="text" placeholder={t('ENTER_EMAIL')}/>
              <button className="button primary medium" type="submit">{t('SUBSCRIBE')}</button>
            </form>
          </div>
        </div>
      );
    }
  });
};
