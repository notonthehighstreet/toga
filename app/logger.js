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
      const streams = [
        {
          path: config.logFile
        },
        {
          type: 'stream',
          stream: createHoneybadgerStream(),
          level: 'error'
        }
      ];

      streams.push({
        type: 'stream',
        stream: process.stdout
      });

      return streams;
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
