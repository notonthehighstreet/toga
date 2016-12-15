const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function multiple(req, res) {
  let assets;
  Promise.resolve()
    .then(getAssets)
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml([
        'test-one.raw.html?props={"one":"toe"}',
        'test-multiple.raw.html?props={"one":"head"}'
      ]);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'multiple',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
