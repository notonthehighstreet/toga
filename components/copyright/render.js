const Copyright = require('./index');
const phrases = require('./i18n.json');
const render = require('toga-component').renderReact;

module.exports = ({locale}, callback) => {
  const html = render({
    component: Copyright,
    phrases: phrases[locale]
  });

  callback(html);
};
