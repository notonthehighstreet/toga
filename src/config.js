module.exports = function breadboardConfig(initialState) {
  return {
    entry: '/index',
    containerRoot: 'dist/app',
    initialState: initialState,
    blacklist: ['newrelic'],
    substitutes: {
      'package.json': require('../package.json')
    }
  };
};
