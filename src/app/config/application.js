/* eslint-disable */

module.exports = {
  "server": {
    "port": process.env.TOGA_SERVER_PORT || 8080,
    "host": 'localhost'
  },
  "assetsHost": process.env.TOGA_ASSETS_HOST,
  "newRelicEnabled": process.env.TOGA_NEWRELIC_ENABLED,
  "logFile": process.env.TOGA_LOGFILE,
  "honeybadger": {
    "environment": process.env.TOGA_ENVIRONMENT,
    "apiKey": process.env.TOGA_HONEYBADGER_KEY
  },
  "syncServer": {
    "enabled": false
  },
  "aws": {
    "key": process.env.TOGA_AWS_ACCESS_KEY,
    "secret": process.env.TOGA_AWS_SECRET_KEY,
    "bucket": process.env.TOGA_AWS_BUCKET,
    "region": process.env.TOGA_AWS_REGION
  }
};
