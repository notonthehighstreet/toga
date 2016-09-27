const startAppServer = require('../../dist/script/start/startAppServer.js');

module.exports = function(args) {
  process.env.TOGA_LOGFILE = process.env.TOGA_LOGFILE || './toga.logstash.log';
  process.env.SOURCE = process.env.SOURCE || 'dist';
  try {
    require(`${process.cwd()}/toga.json`);
  }
  catch (e) {
    return Promise.reject('Toga requires a `toga.json` to be in the root of your project.');
  }
  return startAppServer('.', { path : args.componentsPath});
};
