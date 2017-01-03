const rp = require('request-promise');

function getAssets(bundle = 'all') {
  return rp('http://localhost:3001/asset-bundles')
    .then((response) => {
      const assets = JSON.parse(response);
      const scripts = [
        `http://localhost:3001/${assets['vendor'].js}`,
        `http://localhost:3001/${assets[bundle].js}`
      ];
      const styles = [`http://localhost:3001/${assets[bundle].css}`];
      return {scripts, styles};
    })
    .catch(e => console.log(e)); // eslint-disable-line no-console
}

function getHtml(endPoints) {
  const urls = endPoints.map(endPoint => rp(`http://localhost:3001/${endPoint}`));
  return Promise.all(urls);
}

module.exports = {
  getAssets,
  getHtml
};
