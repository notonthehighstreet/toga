const React = require('react');
const translations = require('./i18n.json');
const createT = require('toga-component').createT;

module.exports = ({locale} = {locale: 'en'}) => {
  const t = createT({phrases: translations[locale]});

  return React.createClass({
    render() {
      return (
        <div>
          <p className="slogan">{t('UNIQUE_INSPIRING')}</p>
          <p className="cta">{t('SIGN_UP')}</p>
          <form action="post" action="/communication-preference">
            <input type="text" placeholder={t('ENTER_EMAIL')}/>
            <button type="submit">{t('SUBSCRIBE')}</button>
          </form>
        </div>
      );
    }
  });
};
