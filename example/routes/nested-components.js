var html = require('../template/html');
var rp = require('request-promise');

module.exports = function nested(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["test-nested"]',
    'http://localhost:8080/v1/components.js?components=["test-nested"]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["test-nested"]'];
  Promise.all([
    rp('http://localhost:8080/v1/test-nested.raw.html?context={"one":"head"}')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'nested',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
