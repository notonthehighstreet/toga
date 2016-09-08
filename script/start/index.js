#!/usr/bin/env node
require('babel-core/register');
const config = require('../../app/config/index')();
if (config.newRelicEnabled) {
  try {
    require('newrelic');
  }
  catch(e) {
    console.log(e); // eslint-disable-line
  }
}

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
