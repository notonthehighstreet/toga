let cachedConfig;

module.exports = (deps = {
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  'deep-assign': require('deep-assign'),
  'package.json': require('../../package.json')
}) => {
  const {
    yargs: { argv },
    path: {join: pathJoin},
    'deep-assign': deepAssign,
    semver,
    '/logger': getLogger,
    'package.json': {version: packageVersion, name: appName}
    } = deps;

  if (cachedConfig) {
    return cachedConfig;
  }

  function addArgv(arg) {
    switch (arg) {
    case 'PORT': argv[arg] ? cachedConfig.server.port = argv[arg] : null; break;
    case 'REDIS_URL': argv[arg] ? cachedConfig.redis = argv[arg] : null; break;
    }
  }

  const apiVersion = semver.major(packageVersion);
  const metaDataConfig = {apiVersion: apiVersion, appName};

  const toArray = value => Array.isArray(value) ? value : [value];
  const configFilePaths = toArray(argv.config);

  const loadConfig = path => require(pathJoin(process.cwd(), path));
  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const configFiles = configFilePaths.map(loadConfig).map(deepClone);

  cachedConfig = deepAssign({}, metaDataConfig, ...configFiles);

    // allow indivdual arguments to be passed
  addArgv('PORT');
  addArgv('REDIS_URL');

  if (getLogger) {
    getLogger().info('Config read', configFilePaths, cachedConfig);
  }
  return cachedConfig;
};
