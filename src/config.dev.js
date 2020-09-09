module.exports = function breadboardConfig(initialState) {
  return {
    entry: '/index',
    containerRoot: 'src/app',
    initialState: initialState,
    substitutes: {
      'package.json': require('../package.json')
    }
  };
};
