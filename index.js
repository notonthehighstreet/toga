const breadboard = require('breadboard');

module.exports = function bootstrap(initialState) {
  const breadboardOptions = {
    entry: '/index',
    containerRoot: 'app',
    initialState: initialState,
    blacklist: ['newrelic'],
    substitutes: {
      'package.json': require('./package.json')
    }
  };

  return breadboard(breadboardOptions);
};
