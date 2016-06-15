#!/usr/bin/env node
require('babel-core/register');

const startAppServer = require('./startAppServer');

if (process.env.NODE_ENV === 'development') {
  require('./startDevSyncServer')();
}

startAppServer();
