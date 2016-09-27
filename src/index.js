const breadboard = require('breadboard');
const devConfig = require('./config.dev');
const prodConfig = require('./config');

module.exports = function bootstrap(initialState) {
  console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)
  const breadboardOptions = process.env.NODE_ENV === 'production'
    ? prodConfig(initialState)
    : devConfig(initialState);

  return breadboard(breadboardOptions);
};
