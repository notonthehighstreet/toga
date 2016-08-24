#!/usr/bin/env node
require('babel-core/register');
const config = require('../../app/config/index')();

const startAppServer = require('./startAppServer');

if (config.syncServer.enabled) {
  require('./startDevSyncServer')();
}

if (config.preCache) {
  require('../preCache').then(startAppServer);
}
else {
  startAppServer();
}
