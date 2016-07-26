#!/usr/bin/env node
require('babel-core/register');
const config = require('../../app/lib/getAppConfig')({
  yargs: require('yargs'),
  path: require('path'),
  semver: require('semver'),
  'deep-assign': require('deep-assign'),
  '/config/application.json': require('../../app/config/application.json'),
  '/config/devOverrides.json': require('../../app/config/devOverrides.json')
})();

const startAppServer = require('./startAppServer');

if (config.syncServer.enabled) {
  require('./startDevSyncServer')();
}

startAppServer();
