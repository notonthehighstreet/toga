const Copyright = require('./');
const phrases = require('./i18n.json');
const render = require('toga-component/render-react');

module.exports = ({locale}, callback) => {
  const html = render({
    component: Copyright,
    phrases: phrases[locale]
  });

  callback(html);
};
