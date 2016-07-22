const {
  name: appName,
  version: packageVersion
} = require('../../package.json');

module.exports = (deps) => {
  // Removing the dependency on breadboard
  if (!deps) {
    deps = {
      yargs: require('yargs'),
      path: require('path'),
      semver: require('semver'),
      '/config/application.json': require('../../app/config/application.json'),
      '/config/devOverrides.json': require('../../app/config/devOverrides.json')
    };
  }
  return function getAppConfig() {
    const {
      yargs,
      path,
      semver
    } = deps;
    let {
      '/config/devOverrides.json': devConfig,
      '/config/application.json': applicationConfig
    } = deps;
    const getAbsolutePath = (filePath) => {
      return path.resolve('.', filePath);
    };
    const argv = yargs
      .default('dev', false)
      .argv;
    let config, overridesConfig = {};

    if (argv.config && typeof argv.config === 'string') {
      overridesConfig = require(getAbsolutePath(argv.config));
    }
    if (argv.dev && typeof argv.dev === 'string') {
      devConfig = require(getAbsolutePath(argv.dev));
    }
    config = Object.assign(
      {
        apiVersion: semver.major(packageVersion),
        appName
      },
      applicationConfig,
      overridesConfig,
      argv.dev ? devConfig : {}
    );

    return Object.freeze(config);
  };
};
