const rp = require('request-promise');

function getAssets(bundle = 'all') {
  return rp('http://localhost:3001/asset-bundles')
    .then((response) => {
      const assets = JSON.parse(response);
      const scripts = assets[bundle].js.map((jsFile) => `http://localhost:3001/v1/${jsFile}`);
      const styles = assets[bundle].css.map((cssFile) => `http://localhost:3001/v1/${cssFile}`);
      return { scripts, styles };
    });
}

function getHtml(endPoints) {
  const urls = endPoints.map(endPoint => rp(`http://localhost:3001/v1/${endPoint}`));
  return Promise.all(urls);
}

module.exports = {
  getAssets,
  getHtml
};
