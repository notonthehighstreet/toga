const argv = require('yargs')
  .default('config', './config/application.json')
  .default('dev', false)
  .argv;
const path = require('path');
const semver = require('semver');
const getAbsolutePath = (filePath) => {
  return path.resolve('.', filePath);
};

module.exports = function getAppConfig() {
  const applicationConfig = require(getAbsolutePath(argv.config));
  const config = Object.assign({
    apiVersion: semver.major(require('../package.json').version)
  }, applicationConfig);
  let devConfig = require('./dev.json');

  if (argv.dev) {
    if (typeof argv.dev === 'string') {
      devConfig = require(getAbsolutePath(argv.dev));
    }
    Object.assign(config, devConfig);
  }

  return Object.freeze(config);
};
