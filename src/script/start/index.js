#!/usr/bin/env node
const config = require('../../app/config/index')()();
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

require('../generateBundles').then(startAppServer);
