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
    let {
      '/config/dev.json': devConfig,
      '/config/application.json': applicationConfig
    } = deps;
    const getAbsolutePath = (filePath) => {
      return path.resolve('.', filePath);
    };
    const argv = yargs
      .default('dev', false)
      .argv;
    let config;

    if (argv.config) {
      applicationConfig = require(getAbsolutePath(argv.config));
    }
    if (argv.dev) {
      if (typeof argv.dev === 'string') {
        devConfig = require(getAbsolutePath(argv.dev));
      }
    }
    config = Object.assign(
      {
        apiVersion: semver.major(packageVersion),
        appName
      },
      applicationConfig,
      argv.dev ? devConfig : {}
    );

    // redis config can be overridden with REDIS_URL env var
    if (process.env.REDIS_URL) {
      config.redis = process.env.REDIS_URL;
    }

    return Object.freeze(config);
  };
};
