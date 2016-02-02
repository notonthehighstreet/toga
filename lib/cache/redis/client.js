const Redis = require('ioredis');
const client = Redis({ enableOfflineQueue: false });

module.exports = client;
