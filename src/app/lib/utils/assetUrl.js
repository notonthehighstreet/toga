const { server, assetsHost } = require('../../config/application');

module.exports.assetUrl = () => {
  if (assetsHost) {
    return `//${assetsHost}/toga-assets`;
  }
  else {
    return `//${server.host}:${server.port}`;
  }
};
