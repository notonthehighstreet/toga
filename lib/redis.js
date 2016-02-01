const redis = require('redis');
const debug = require('debug')('toga');
const client = redis.createClient();


module.exports = client;
