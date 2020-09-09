function setEnvDefault(key, val) {
  if (!process.env[key]) {
    process.env[key] = val;
  }
}
setEnvDefault('NODE_ENV', 'development');
setEnvDefault('TOGA_ENVIRONMENT', 'development');
setEnvDefault('TOGA_HONEYBADGER_KEY', 'its a secret');
setEnvDefault('TOGA_LOGFILE', './logs/application.logstash.log');
