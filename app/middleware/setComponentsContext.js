module.exports = (deps) => {
  return function setComponentsContext({paramName}) {
    const {
      'lodash': _
      } = deps;
    const componentsContext = (encodedConfig) => {
      if (_.isUndefined(encodedConfig)) {
        return {};
      }
      else {
        return JSON.parse(decodeURIComponent(encodedConfig));
      }
    };

    return (req, res, next) => {
      try {
        req.componentsContext = componentsContext(req.query[paramName]);
        next();
      }
      catch(error) {
        next(error);
      }
    };
  };
};
