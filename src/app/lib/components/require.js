module.exports = (deps) => {
  const {
    '/lib/utils/errors': { InternalServerError },
    '/lib/getComponentInfo': getComponentInfo,
    debug
  } = deps;

  return (componentName) => {
    const log = debug('toga:components:require');
    log('Start');
    const info = getComponentInfo(componentName)[0];
    return Promise.resolve(info.requirePath)
      .then((path) => {
        try {
          log('Requiring component');
          const component = require(path);
          log('Fininsh requiring component');
          return  { path: path,  component};
        }
        catch(e) {
          log(e);
          throw new InternalServerError(`${path} require/Parsing error`);
        }
      });
  };
};
