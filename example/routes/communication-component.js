const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function communication(req, res) {
  let assets;
  Promise.resolve()
    .then(() => getAssets(['test-communication']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml(['test-communication.raw.html']);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'communication',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
