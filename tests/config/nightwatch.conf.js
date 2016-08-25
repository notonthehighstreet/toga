/* eslint-disable */
const argv = require('yargs')
  .usage('Usage: $0 --target=[string]')
  .argv;
require('babel-core/register')({
  only: [/app/, /tests/, /components/]
});
// require("babel-polyfill");
const hook = require('node-hook').hook;
hook('.scss', (source, filename) => `console.log("${filename}");`);

const testServer = require('../../example/index.js');

module.exports = (function(settings) {
  settings.test_settings.default.globals = {
    TARGET_PATH : argv.target || 'http://localhost:3000',
    before: function(done) {
      return testServer
        .then(done)
        .catch(done);
    },
    after: function(done) {
      return testServer.then(({ togaServer })=>{
        togaServer.close(done);
        process.exit(0);
      })
      .catch((e)=>{
        console.log(`e`, e);
        done()
        process.exit(1);
      });
    }
  };
  return settings;
})(require('./nightwatch.json'));
