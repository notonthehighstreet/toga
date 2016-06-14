var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["footer"]',
    'http://localhost:8080/v1/components.js?components=[{"name":"footer"}]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["footer"]'];
  Promise.all([
    rp('http://localhost:8080/v1/footer.raw.html?context={"one":"toe"}&locale=de')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        footer: htmlStrings[0],
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
