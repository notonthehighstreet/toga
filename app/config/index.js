let cachedConfig;
const { argv } = require('yargs');
const { join: pathJoin } = require('path');
const semver = require('semver');
const deepAssign = require('deep-assign');
const debug = require('debug');
const  {version: packageVersion, name: appName} = require('../../package.json');

module.exports = (componentsPath) => {
  if (cachedConfig) {
    return cachedConfig;
  }

  require('./environment');

  const log = debug('toga:config');

  argv.components = argv.components || componentsPath || './components';
  const isLocal = argv.components.indexOf('.') === 0;
  const componentsJsonPath = isLocal ? argv.components : ('node_modules/' + argv.components);
  const componentConfig = require(`../../${componentsJsonPath}/toga.json`);
  const apiVersion = semver.major(packageVersion);
  const metaDataConfig = {apiVersion: apiVersion, appName};

  const toArray = value => Array.isArray(value) ? value : [value];
  const configFilePaths = toArray(argv.config || './app/config/application.js');
  const loadConfig = path => require(pathJoin(__dirname, '..', '..', path));
  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const configFiles = configFilePaths.map(loadConfig).map(deepClone);

  cachedConfig = deepAssign({}, metaDataConfig, ...configFiles,
    { ...componentConfig,
      components: {
        ...componentConfig.components,
        path: componentsJsonPath + '/' + componentConfig.components.path
      }
    });

  log(JSON.stringify(cachedConfig, null, 2));

  return cachedConfig;
};
