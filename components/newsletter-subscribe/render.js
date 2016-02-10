const createComponent = require('./');
const render = require('toga-component').renderReact;

module.exports = ({locale}, cb) => {
  const html = render({
    component: createComponent({locale})
  });

  cb(null, html);
};
