#!/usr/bin/env node
const config = require('../../app/config/index')()();

const startAppServer = require('./startAppServer');
if (config.syncServer.enabled) {
  require('./startDevSyncServer')();
}

startAppServer();
