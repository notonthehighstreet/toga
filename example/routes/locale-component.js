var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.min.js',
    `http://localhost:8080/v1/components.min.js?components=[{"name":"test-one"}]&locale=${req.query.locale || ''}`
  ];
  const styles = [
    'http://localhost:8080/v1/core.css',
    `http://localhost:8080/v1/components.min.css?components=["test-one"]&locale=${req.query.locale || ''}`
  ];
  Promise.all([
    rp(`http://localhost:8080/v1/test-one.raw.html?props={"one":"toe"}&locale=${req.query.locale || ''}`)
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'locale',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
