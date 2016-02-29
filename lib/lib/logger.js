const bunyan = require('bunyan');
const logFile = require('../../config/getAppConfig')().logFile;
const appName = require('../../package.json').name;

function fileSystemLogStream() {
  return {
    path: logFile
  };
}

function stdoutLogStream() {
  return {
    stream: process.stdout
  };
}

function defaultLogStreams() {
  return [
    fileSystemLogStream(),
    stdoutLogStream()
  ];
}

const logger = bunyan.createLogger({
  name: appName,
  streams: defaultLogStreams(),
  serializers: bunyan.stdSerializers
});

module.exports = logger;
