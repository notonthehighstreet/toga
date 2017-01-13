const { server, assets } = require('../../config/application');

module.exports.assetUrl = () => {
  if (assets.host) {
    return `//${assets.host}/${assets.prefix}`;
  }
  else {
    return `//${server.host}:${server.port}`;
  }
};
