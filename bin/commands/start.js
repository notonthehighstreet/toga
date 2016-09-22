const startAppServer = require('../../dist/script/start/startAppServer.js');

module.exports = function(args) {
  try {
    require(`${process.cwd()}/toga.json`);
  }
  catch (e) {
    return Promise.reject('Toga requires a `toga.json` to be in the root of your project.');
  }
  return startAppServer('.', { path : args.componentsPath});
};
