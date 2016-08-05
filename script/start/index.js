#!/usr/bin/env node
require('babel-core/register');
const config = require('../../app/lib/getAppConfig')()();

const startAppServer = require('./startAppServer');

if (config.syncServer.enabled) {
  require('./startDevSyncServer')();
}

startAppServer();
