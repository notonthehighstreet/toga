let finalConfig;

module.exports = (deps = {
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  'deep-assign': require('deep-assign')
}) => {
  return () => {
    const {
      yargs: {argv},
      path: {join: pathJoin},
      'deep-assign': deepAssign,
      semver
    } = deps;

    const loadConfig = path => require(pathJoin(process.cwd(), path));
    const mergeConfig = (config, path) => deepAssign(config, loadConfig(path));
    const readApplicationMeta = () => require('../../package.json');
    const mergeAppMeta = (config, meta) => deepAssign({}, config, meta);
    const toArray = value => Array.isArray(value) ? value : [value];

    if (!finalConfig) {
      const configFilePaths = toArray(argv.config);
      const config = configFilePaths.reduce(mergeConfig, {});
      const {
        name: appName,
        version: packageVersion
      } = readApplicationMeta();
      const apiVersion = semver.major(packageVersion);

      finalConfig = Object.freeze(mergeAppMeta(config, {appName, apiVersion}));
    }

    return finalConfig;
  };
};
