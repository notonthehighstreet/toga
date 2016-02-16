const semver = require('semver');
const applicationConfig = require('./application.json');
const devConfig = require('./dev.json');
const mergedConfig = Object.assign({
  apiVersion: semver.major(require('../../package.json').version)
}, devConfig, applicationConfig);

module.exports = Object.freeze(mergedConfig);
