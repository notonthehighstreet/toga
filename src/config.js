module.exports = function breadboardConfig(initialState) {
  return {
    entry: '/index',
    containerRoot: 'dist/app',
    initialState: initialState,
    substitutes: {
      'package.json': require('../package.json')
    }
  };
};
