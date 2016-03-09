const {
  name: appName,
  version: packageVersion
  } = require('../../package.json');

module.exports = (deps) => {
  return function getAppConfig() {
    const {
      yargs,
      path,
      semver
    } = deps;

    const getAbsolutePath = (filePath) => {
      return path.resolve('.', filePath);
    };
    const argv = yargs
      .default('config', './config/application.json')
      .default('dev', false)
      .argv;
    const applicationConfig = require(getAbsolutePath(argv.config));
    const config = Object.assign({
      apiVersion: semver.major(packageVersion),
      appName
    }, applicationConfig);
    let devConfig = require('../../config/dev.json');

    if (argv.dev) {
      if (typeof argv.dev === 'string') {
        devConfig = require(getAbsolutePath(argv.dev));
      }
      Object.assign(config, devConfig);
    }

    return Object.freeze(config);
  };
};
