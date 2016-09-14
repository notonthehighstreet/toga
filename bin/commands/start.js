const startAppServer = require('../../script/start/startAppServer.js');

module.exports = function() {
  let togaJson;
  try {
    togaJson = require(`${process.cwd()}/toga.json`);
  }
  catch (e) {
    return Promise.reject('Toga requires a `toga.json` to be in the root of your project.');
  }
  return startAppServer(togaJson.components.path);
};
