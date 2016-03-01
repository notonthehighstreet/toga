const bunyan = require('bunyan');
const logFile = require('../../config/getAppConfig')().logFile;
const appName = require('../../package.json').name;

function createFileSystemLogStreamConfig() {
  return {
    path: logFile
  };
}

function createStdoutLogStreamConfig() {
  return {
    stream: process.stdout
  };
}

function createDefaultLogStreamsConfig() {
  return [
    createFileSystemLogStreamConfig(),
    createStdoutLogStreamConfig()
  ];
}

const logger = bunyan.createLogger({
  name: appName,
  streams: createDefaultLogStreamsConfig(),
  serializers: bunyan.stdSerializers
});

module.exports = logger;
