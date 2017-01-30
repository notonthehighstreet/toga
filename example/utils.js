const rp = require('request-promise');
const { server } = require('../src/app/config/application');
const { host, port } = server;

const getSingleBundleAssets = (bundle) => {
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
};

function getAssets(bundles = ['all']) {
  const promises = [];
  bundles.forEach(b => promises.push(getSingleBundleAssets(b)));
  return Promise.all(promises)
      .then((bundledAssets) => {
        const assets = { scripts: [], styles: [] };
        bundledAssets.forEach(b => {
          assets.scripts = assets.scripts.concat(b.scripts);
          assets.styles = assets.styles.concat(b.styles);
        });
        return assets;
      });
}

function getHtml(endPoints) {
  const urls = endPoints.map(endPoint => {
    return (endPoint.indexOf('http://') > -1)
      ?  rp(endPoint)
      : rp(`http://${host}:${port}/${endPoint}`);
  });
  return Promise.all(urls);
}

module.exports = {
  getAssets,
  getHtml
};
