#!/usr/bin/env node
'use strict';

var argv = require('yargs').default('reporter', 'dot').argv;
var spawn = require('child_process').spawn;
var path = require('path');
var mochaPath = path.join(__dirname, '../node_modules/.bin/mocha');
var glob = '**/*\.spec.js';

var mochaArgs = [
  'spec/' + glob,
  '--compilers', 'js:babel-core/register',
  '--reporter', argv.reporter,
  '--require', './spec/specHelper.js'
];

if (argv.watch) {
  mochaArgs.push('--watch');
}

var testProcess;

testProcess = spawn(
  mochaPath,
  mochaArgs,
  {
    stdio: 'inherit'
  }
);

testProcess.on('close', function(code) {
  process.exit(code);
});
