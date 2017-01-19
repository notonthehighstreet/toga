const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function one(req, res) {
  let assets;
  return Promise.resolve()
    .then(() => getAssets(['test-one']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml(['test-one.raw.html?props={"one":"toe"}']);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'one',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
