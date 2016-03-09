const breadboard = require('breadboard');

module.exports = function bootstrap(initialState) {
  const breadboardOptions = {
    entry: '/index',
    containerRoot: 'app',
    initialState: initialState,
    blacklist: ['newrelic']
  };

  return breadboard(breadboardOptions);
};
