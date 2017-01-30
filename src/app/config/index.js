let cachedConfig;
const { argv } = require('yargs');
const { join: pathJoin } = require('path');
const deepAssign = require('deep-assign');
const debug = require('debug');

module.exports = () => (root, opts = {}) => {
  if (cachedConfig) {
    return cachedConfig;
  }
  require('./environment');

  const log = debug('toga:config');
  argv.components = argv.components || root || './components';
  const basePath = argv.components.indexOf('.') === 0 ? '' : 'node_modules/';
  const componentsBase  = `${process.cwd()}/${basePath}`.replace(/\/.\//g, '/');
  const componentsJsonPath = `${componentsBase}${argv.components}/`.replace(/\/.\//g, '/');
  const componentConfig = require(`${componentsJsonPath}toga.json`);

  const toArray = value => Array.isArray(value) ? value : [value];
  const configFilePaths = toArray(argv.config || './app/config/application.js');
  const loadConfig = path => require(pathJoin(__dirname, '..', '..', path));
  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const configFiles = configFilePaths.map(loadConfig).map(deepClone);
  const componentsPath = opts.path || componentConfig.components.path;

  if (componentConfig.staticComponents) {
    const staticFile = (componentsJsonPath + componentsPath).replace(/\/.\//g, '/') + '/' + componentConfig.staticComponents.file;
    try {
      const { staticComponents } = require(staticFile);
      componentConfig.staticComponents.file = staticFile;
      componentConfig.staticComponents.components = staticComponents;
    }
    catch(e) {
      componentConfig.staticComponents = {};
    }
  }
  else {
    componentConfig.staticComponents = {};
  }

  cachedConfig = deepAssign({}, ...configFiles,
    { ...componentConfig,
      staticComponents: {
        ...componentConfig.staticComponents
      },
      components: {
        ...componentConfig.components,
        path: (componentsJsonPath + componentsPath).replace(/\/.\//g, '/'),
        base: componentsBase,
        packageJson: componentsJsonPath + 'package.json'
      }
    });

  log(JSON.stringify(cachedConfig, null, 2));
  log('NODE_ENV', process.env.NODE_ENV);
  log('TOGA_ENVIRONMENT', process.env.TOGA_ENVIRONMENT);

  return cachedConfig;
};
