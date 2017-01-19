const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function nested(req, res) {
  let assets;
  return Promise.resolve()
    .then(() => getAssets(['test-nested']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml(['test-nested.raw.html?props={"one":"head"}']);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'nested',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
