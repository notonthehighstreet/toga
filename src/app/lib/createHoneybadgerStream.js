module.exports = (deps) => {
  return function createHoneybadgerStream() {
    const {
      stream,
      honeybadger: honeybadger,
      debug,
      '/config/index': getConfig
    } = deps;
    const config = getConfig();

    const d = debug('toga:honeybadger');
    const hb = honeybadger.configure({
      apiKey: config.honeybadger.apiKey,
      developmentEnvironments: ['development', 'testing'],
      environment: config.honeybadger.environment
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
        hb.notify(bunyanMessage.err, errorMeta);
        hb.on('sent', next);
      }
    });
  };
};
