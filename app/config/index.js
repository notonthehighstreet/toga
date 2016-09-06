let cachedConfig;

module.exports = (deps = {
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  'deep-assign': require('deep-assign'),
  'package.json': require('../../package.json'),
  debug: require('debug')
}) => {
  const {
    yargs: { argv },
    path: {join: pathJoin},
    'deep-assign': deepAssign,
    semver,
    '/logger': getLogger,
    'package.json': {version: packageVersion, name: appName},
    debug
    } = deps;

  if (cachedConfig) {
    return cachedConfig;
  }
  const log = debug('toga:config');

  argv.components = argv.components || './components';
  const isLocal = argv.components.indexOf('.') === 0;
  const componentsJsonPath = isLocal ? argv.components : ('node_modules/' + argv.components);
  const componentConfig = require(`../../${componentsJsonPath}/toga.json`);
  const apiVersion = semver.major(packageVersion);
  const metaDataConfig = {apiVersion: apiVersion, appName};

  const toArray = value => Array.isArray(value) ? value : [value];
  const configFilePaths = toArray(argv.config || './app/config/application.json');

  const loadConfig = path => require(pathJoin(process.cwd(), path));
  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const configFiles = configFilePaths.map(loadConfig).map(deepClone);

  cachedConfig = deepAssign({}, metaDataConfig, ...configFiles,
    { ...componentConfig,
      components: {
        ...componentConfig.components,
        path: componentsJsonPath + '/' + componentConfig.components.path
      }
    });

  if (getLogger) {
    getLogger().info('Config read', configFilePaths, cachedConfig);
  }

  log(JSON.stringify(cachedConfig, null, 2));

  return cachedConfig;
};
