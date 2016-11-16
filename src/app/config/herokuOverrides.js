module.exports = {
  'server': {
    'port': process.env.PORT,
    'host': '0.0.0.0'
  },
  'redis': process.env.REDIS_URL,
  'redisKeyTTL': 60,
};
