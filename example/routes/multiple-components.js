var html = require('../template/html');
var rp = require('request-promise');

module.exports = function multiple(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["test","test2"]',
    'http://localhost:8080/v1/components.js?components=[{"name":"test"},{"name":"test2"}]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["test","test2"]'];
  Promise.all([
    rp('http://localhost:8080/v1/test.raw.html?context={"one":"toe"}'),
    rp('http://localhost:8080/v1/test2.raw.html?context={"one":"head"}')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'multiple',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
