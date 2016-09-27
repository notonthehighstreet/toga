/* eslint-disable */

module.exports = {
  "server": {
    "port": 8080,
    "host": "0.0.0.0"
  },
  "redis": {
    "host": process.env.TOGA_REDIS_HOST,
    "port": 6379
  },
  "newRelicEnabled": process.env.TOGA_NEWRELIC_ENABLED,
  "logFile": process.env.TOGA_LOGFILE,
  "honeybadger": {
    "environment": process.env.TOGA_ENVIRONMENT,
    "apiKey": process.env.TOGA_HONEYBADGER_APIKEY
  },
  "syncServer": {
    "enabled": false
  },
  "redisKeyTTL": 604800,
  "preCache": true
};
