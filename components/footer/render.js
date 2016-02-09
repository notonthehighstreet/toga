const buildComponent = require('./');
const render = require('toga-component').renderReact;

module.exports = ({locale, context}, callback) => {
  const html = render({
    component: buildComponent({locale}),
    context
  });

  callback(null, html);
};
