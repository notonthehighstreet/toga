#!/usr/bin/env node

require('babel-core/register');
const debugError = require('debug')('toga:error');
const preCacheComponentBundle = require('../lib/lib/jsBundler/preCacheComponentBundle');
const startAppServer = require('../lib/startAppServer');
const startDevSyncServer = require('../lib/startDevSyncServer');

preCacheComponentBundle().then(() => {
  startDevSyncServer();

  return startAppServer();
}, (err) => debugError(err));
