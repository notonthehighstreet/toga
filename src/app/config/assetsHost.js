const server = require('./server');

module.exports = () => {
  return process.env.TOGA_ASSETS_HOST || `${server.host}:${server.port}`;
};
