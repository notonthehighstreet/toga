#!/usr/bin/env node

require('babel-core/register');
const debugError = require('debug')('toga:error');
const preCacheComponentBundle = require('../lib/lib/jsBundler/preCacheComponentBundle');
const startAppServer = require('../lib/startAppServer');

preCacheComponentBundle().then(startAppServer, (err) => debugError(err));
