#!/usr/bin/env node
require('babel-core/register');

require('../lib/startNewRelic');
const argv = require('yargs')
  .default('dev', false)
  .argv;
const logError = require('../lib/lib/logger').error;
const preCacheComponentBundle = require('../lib/lib/jsBundler/preCacheComponentBundle');
const startAppServer = require('../lib/startAppServer');

preCacheComponentBundle().then(() => {
  if (argv.dev) {
    const startDevSyncServer = require('../lib/startDevSyncServer');
    startDevSyncServer();
  }

  return startAppServer();
}, (err) => logError(err));
