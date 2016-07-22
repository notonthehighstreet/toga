var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["test-communication"]',
    'http://localhost:8080/v1/components.js?components=["test-communication"]'
  ];
  const styles = [
    'http://localhost:8080/v1/core.css',
    'http://localhost:8080/v1/styles.css?components=["test-communication"]'
  ];
  Promise.all([
    rp('http://localhost:8080/v1/test-communication.raw.html')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'communication',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
