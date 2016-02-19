#!/usr/bin/env node

require('babel-core/register');
const argv = require('yargs')
  .default('dev', false)
  .argv;
const debugError = require('debug')('toga:error');
const preCacheComponentBundle = require('../lib/lib/jsBundler/preCacheComponentBundle');
const startAppServer = require('../lib/startAppServer');
const startDevSyncServer = require('../lib/startDevSyncServer');

preCacheComponentBundle().then(() => {
  if (argv.dev) {
    startDevSyncServer();
  }

  return startAppServer();
}, (err) => debugError(err));
