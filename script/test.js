#!/usr/bin/env node
/*eslint no-process-exit: 0*/

'use strict';

const argv = require('yargs').default('reporter', 'dot').argv;
const spawn = require('child_process').spawn;
const path = require('path');
const mochaPath = path.join(__dirname, '../node_modules/.bin/mocha');
const mochaArgs = [
  '{spec,components}/**/*.spec.js',
  '--compilers', 'js:babel-core/register',
  '--reporter', argv.reporter,
  '--require', './spec/specHelper.js',
  '--delay'
];
let testProcess;

if (argv.watch) {
  mochaArgs.push('--watch');
}
testProcess = spawn(
  mochaPath,
  mochaArgs,
  {
    stdio: 'inherit'
  }
);
testProcess.on('close', process.exit);
