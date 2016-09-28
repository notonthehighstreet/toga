const breadboard = require('breadboard');
const devConfig = require('./config.dev');
const prodConfig = require('./config');
require('babel-core/register');

module.exports = function bootstrap(initialState) {

  const breadboardOptions = process.env.SOURCE === 'dist'
    ? prodConfig(initialState)
    : devConfig(initialState);

  return breadboard(breadboardOptions);
};
