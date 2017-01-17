const { assets } = require('../../app/config/application');

module.exports.assetUrl = () => {
  return (assets.host)
    ? `//${assets.host}/${assets.prefix}`
    : '';
};
