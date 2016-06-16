var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["test"]',
    'http://localhost:8080/v1/components.js?components=[{"name":"test"}]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["test"]'];
  Promise.all([
    rp('http://localhost:8080/v1/test.raw.html?context={"one":"toe"}')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'one',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
