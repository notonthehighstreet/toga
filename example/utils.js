const rp = require('request-promise');
const { server } = require('../src/app/config/application');
const { host, port } = server;

function getAssets(bundle = 'all') {
  return rp(`http://${host}:${port}/asset-bundles`)
    .then((response) => {
      const assets = JSON.parse(response);
      const scripts = [
        `${assets['vendor'].js}`,
        `${assets[bundle].js}`
      ];
      const styles = [`${assets[bundle].css}`];
      return {scripts, styles};
    })
    .catch(e => console.log(e)); // eslint-disable-line no-console
}

function getHtml(endPoints) {
  const urls = endPoints.map(endPoint => rp(`http://${host}:${port}/${endPoint}`));
  return Promise.all(urls);
}

module.exports = {
  getAssets,
  getHtml
};
