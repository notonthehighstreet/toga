const breadboard = require('breadboard');
const devConfig = require('./config.dev');
const prodConfig = require('./config');
require('babel-core/register');

module.exports = function bootstrap(initialState, options = {}) {
  let breadboardOptions = process.env.TOGA_SOURCE === 'dev'
    ? devConfig(initialState)
    : prodConfig(initialState);

  // Replace original logger by a custom one.
  if (typeof options.logger === 'object' && typeof options.logger.log === 'function') {
    const getLogger = () => options.logger;

    breadboardOptions = {
      ...breadboardOptions,
      substitutes: {
        ...breadboardOptions.substitutes,
        '/logger': getLogger
      },
    };
  }

  return breadboard(breadboardOptions);
};
