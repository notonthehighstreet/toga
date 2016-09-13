/* eslint-disable */
var chalk = require('chalk');

const log = (color, err) => {
  if (!err) {
    return;
  }
  console.log(chalk[color](err.message || err));
};

const error = (msg) => log('red', msg);
const success = (msg) => log('green', msg);
const info = (msg) => log('cyan', msg);
const warn = (msg) => log('yellow', msg);

module.exports = { info, warn, error, success };
