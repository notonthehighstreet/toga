module.exports = (deps) => {
  let logger;

  return function getLogger() {
    const {
      '/lib/getAppConfig': getAppConfig,
      'bunyan': bunyan
      } = deps;
    const config = getAppConfig();

    function createFileSystemLogStreamConfig() {
      return {
        path: config.logFile
      };
    }

    function createDefaultLogStreamsConfig() {
      return [
        createFileSystemLogStreamConfig()
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
