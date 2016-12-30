const startAppServer = require('../../dist/script/start/startAppServer.js');

module.exports = function(args) {
  process.env.TOGA_LOGFILE = process.env.TOGA_LOGFILE || './toga.logstash.log';
  return startAppServer('.', { path : args.componentsPath});
};
