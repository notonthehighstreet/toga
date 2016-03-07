const fs = require('fs');
const logger = require('./lib/logger');

if (fs.existsSync('./newrelic.js')) {
  require('newrelic');
}
else {
  logger.info('newrelic.js configuration file not found, newrelic will NOT be loaded');
}
