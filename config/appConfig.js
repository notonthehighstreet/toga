const applicationConfig = require('./application.json');
const devConfig = require('./dev.json');
const mergedConfig = Object.assign({}, devConfig, applicationConfig);

module.exports = Object.freeze(mergedConfig);
