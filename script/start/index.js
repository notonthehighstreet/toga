#!/usr/bin/env node
require('babel-core/register');

const argv = require('yargs')
  .default('dev', false)
  .argv;

const startAppServer = require('./startAppServer');

if (argv.dev) {
  require('./startDevSyncServer')();
}
return startAppServer();
