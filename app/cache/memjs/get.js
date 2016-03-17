module.exports = (deps) => {
  return function get(key) {
    const {
      '/cache/memjs/client': client,
      'es6-promisify': promisify,
      'lodash': _
      } = deps;
    const memchachedGet = promisify(client.get.bind(client));
    const isNull = (str) => {
      const unicodeNull = /\u0000/g;

      return _.isNull(str) || unicodeNull.test(str.toString());
    };

    return memchachedGet(key)
      .then((data) => {
        return data.reduce((previous, current) => {
          if (!isNull(current)) {
            return previous + current.toString();
          }

          return previous;
        }, '');
      });
  };
};
