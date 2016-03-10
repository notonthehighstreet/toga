module.exports = (deps) => {
  let logger;

  return function getLogger() {
    const {
      '/lib/getAppConfig': getAppConfig,
      '/lib/createHoneybadgerStream': createHoneybadgerStream,
      bunyan
      } = deps;
    const config = getAppConfig();

    function createDefaultLogStreamsConfig() {
      return [
        {
          path: config.logFile
        },
        {
          type: 'stream',
          stream: createHoneybadgerStream(),
          level: 'error'
        }
      ];
    }

    if (!logger) {
      logger = bunyan.createLogger({
        name: config.appName,
        streams: createDefaultLogStreamsConfig(),
        serializers: bunyan.stdSerializers
      });
    }

    return logger;
  };
};
