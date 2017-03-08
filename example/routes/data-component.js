const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function data(req, res) {
  let assets;
  Promise.resolve()
    .then(() => getAssets(['test-data']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml(['test-data.raw.html']);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'data',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
