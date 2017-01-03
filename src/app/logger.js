let logger;
module.exports = (deps) => {
  return function getLogger() {
    const {
      '/config/index': getConfig,
      '/lib/createHoneybadgerStream': createHoneybadgerStream,
      bunyan
      } = deps;
    const config = getConfig();

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
      // todo: should logger live in the consuming project i.e. noths-components?
      logger = bunyan.createLogger({
        name: 'Toga', // todo : should this now be the consuming project i.e. noths components?
        streams: createDefaultLogStreamsConfig(),
        serializers: bunyan.stdSerializers
      });
    }

    return logger;
  };
};
