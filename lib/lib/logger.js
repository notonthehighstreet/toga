const bunyan = require('bunyan');
const logFile = require('../../config/getAppConfig')().logFile;
const appName = require('../../package.json').name;

function createFileSystemLogStreamConfig() {
  return {
    path: logFile
  };
}

function createDefaultLogStreamsConfig() {
  return [
    createFileSystemLogStreamConfig()
  ];
}

const logger = bunyan.createLogger({
  name: appName,
  streams: createDefaultLogStreamsConfig(),
  serializers: bunyan.stdSerializers
});

module.exports = logger;
