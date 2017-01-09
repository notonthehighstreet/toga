const server = require('./server');

module.exports.assetsHost = () => {
  return process.env.TOGA_ASSETS_HOST || `${server.host}:${server.port}`;
};

module.exports.assetsPrefix = () => {
  return process.env.TOGA_ASSETS_HOST ? 'toga_assets/' : '';
};
