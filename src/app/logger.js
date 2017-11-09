let logger;
module.exports = (deps) => {
  return function getLogger() {
    const {
      '/config/index': getConfig,
      '/lib/createHoneybadgerStream': createHoneybadgerStream,
      'fluent-logger-stream': FluentLogger,
      bunyan
      } = deps;
    const config = getConfig();

    function createFluentLogger({ tag, host, port }) {
      return new FluentLogger({
        tag, type: 'forward', host, port
      });
    }

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

      if(config.fluentd && config.fluentd.enabled) {
        streams.push({
          type: 'stream',
          stream: createFluentLogger(config.fluentd),
          level: 'info'
        });
      }

      return streams;
    }

    if (!logger) {
      logger = bunyan.createLogger({
        name: 'Toga',
        streams: createDefaultLogStreamsConfig(),
        serializers: bunyan.stdSerializers
      });
    }

    return logger;
  };
};
