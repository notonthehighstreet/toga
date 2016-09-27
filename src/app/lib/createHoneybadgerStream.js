module.exports = (deps) => {
  return function createHoneybadgerStream() {
    const {
      stream,
      honeybadger: Honeybadger,
      debug,
      '/config/index': getConfig
    } = deps;
    const config = getConfig();

    const d = debug('toga:honeybadger');
    const hb = new Honeybadger({
      apiKey: config.honeybadger.apiKey,
      developmentEnvironments: ['development', 'testing'],
      server: {
        'environment_name': config.honeybadger.environment
      }
    });

    return new stream.Writable({
      write: function(chunk, encoding, next) {
        const bunyanMessage = JSON.parse(chunk.toString());
        const errorMeta = {};

        if (bunyanMessage.req) {
          errorMeta.headers = bunyanMessage.req.headers;
        }
        errorMeta.context = {
          req: bunyanMessage.req,
          res: bunyanMessage.res
        };
        d('Sending error to Honeybadger %o', bunyanMessage.err);
        hb.send(bunyanMessage.err, errorMeta);
        hb.on('sent', next);
      }
    });
  };
};
