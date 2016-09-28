const breadboard = require('breadboard');
const devConfig = require('./config.dev');
const prodConfig = require('./config');
require('babel-core/register');

module.exports = function bootstrap(initialState) {
  const breadboardOptions = process.env.TOGA_SOURCE === 'dev'
    ? devConfig(initialState)
    : prodConfig(initialState);

  return breadboard(breadboardOptions);
};
