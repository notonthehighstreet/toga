#!/usr/bin/env node
require('babel-core/register');

const argv = require('yargs')
  .default('dev', false)
  .argv;
const preCacheComponentBundle = require('./preCacheComponentBundle');
const startAppServer = require('./startAppServer');

preCacheComponentBundle().then(() => {
  if (argv.dev) {
    require('./startDevSyncServer')();
  }
  return startAppServer();
});
