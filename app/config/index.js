let cachedConfig;
const { argv } = require('yargs');
const { join: pathJoin } = require('path');
const semver = require('semver');
const deepAssign = require('deep-assign');
const debug = require('debug');
const  {version: packageVersion, name: appName} = require('../../package.json');

module.exports = (root, opts = {}) => {
  if (cachedConfig) {
    return cachedConfig;
  }

  require('./environment');

  const log = debug('toga:config');
  argv.components = argv.components || root || './components';
  const basePath = argv.components.indexOf('.') === 0 ? '' : 'node_modules/';
  let componentsJsonPath = `${process.cwd()}/${basePath}${argv.components}/`.replace(/\/.\//g, '/');

  const componentConfig = require(`${componentsJsonPath}toga.json`);
  const apiVersion = semver.major(packageVersion);
  const metaDataConfig = {apiVersion: apiVersion, appName};

  const toArray = value => Array.isArray(value) ? value : [value];
  const configFilePaths = toArray(argv.config || './app/config/application.js');
  const loadConfig = path => require(pathJoin(__dirname, '..', '..', path));
  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const configFiles = configFilePaths.map(loadConfig).map(deepClone);
  const componentsPath = opts.path || componentConfig.components.path;

  cachedConfig = deepAssign({}, metaDataConfig, ...configFiles,
    { ...componentConfig,
      components: {
        ...componentConfig.components,
        path: (componentsJsonPath + componentsPath).replace(/\/.\//g, '/')
      }
    });

  log(JSON.stringify(cachedConfig, null, 2));

  return cachedConfig;
};
