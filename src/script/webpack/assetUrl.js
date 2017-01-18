const { assets } = require('../../app/config/application');

module.exports.assetUrl = () => {
  if (assets.url) {
    return `//${assets.url}`;
  }
  if (assets.host) {
    return `//${assets.host}/${assets.prefix}`;
  }
  return '';
};
