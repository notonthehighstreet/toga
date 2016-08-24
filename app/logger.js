let logger;
module.exports = (deps) => {
  return function getLogger() {
    const {
      '/config/index': config,
      '/lib/createHoneybadgerStream': createHoneybadgerStream,
      bunyan
      } = deps;

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
        stream: process.stdout,
        level: 'info'
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
