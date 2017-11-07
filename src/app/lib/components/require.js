module.exports = (deps) => {
  const {
    '/lib/utils/errors': { InternalServerError },
    '/lib/getComponentInfo': getComponentInfo,
    debug
  } = deps;

  return (componentName) => {
    const log = debug('toga:requireComponent');
    const info = getComponentInfo(componentName)[0];
    return Promise.resolve(info.requirePath)
      .then((path) => {
        try {
          return  { path: path,  component: require(path)};
        }
        catch(e) {
          log(e);
          throw new InternalServerError(`${path} require/Parsing error`);
        }
      });
  };
};
