var html = require('../template/html');
var rp = require('request-promise');

module.exports = function multiple(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["footer","newsletter-subscribe"]',
    'http://localhost:8080/v1/components.js?components=[{"name":"footer"},{"name":"newsletter-subscribe"}]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["footer","newsletter-subscribe"]'];
  Promise.all([
    rp('http://localhost:8080/v1/footer.raw.html?context={"one":"toe"}&locale=de'),
    rp('http://localhost:8080/v1/newsletter-subscribe.raw.html?context={%22one%22:%22toe%22}&locale=de')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        footer: htmlStrings[0],
        newsletter: htmlStrings[1],
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
