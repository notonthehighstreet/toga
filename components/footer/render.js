const buildComponent = require('./');
const render = require('toga-component').renderReact;

module.exports = ({locale}, callback) => {
  const html = render({
    component: buildComponent({locale})
  });

  callback(html);
};
