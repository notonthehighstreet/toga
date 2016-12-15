/* eslint-disable */

module.exports = {
  "server": {
    "port": 8080,
    "host": "0.0.0.0"
  },
  "newRelicEnabled": process.env.TOGA_NEWRELIC_ENABLED,
  "logFile": process.env.TOGA_LOGFILE,
  "honeybadger": {
    "environment": process.env.TOGA_ENVIRONMENT,
    "apiKey": process.env.TOGA_HONEYBADGER_KEY
  },
  "syncServer": {
    "enabled": false
  }
};
