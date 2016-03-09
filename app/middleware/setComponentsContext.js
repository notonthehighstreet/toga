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
        try {
          return JSON.parse(decodeURIComponent(encodedConfig));
        }
        catch(e) {
          return {};
        }
      }
    };

    return (req, res, next) => {
      req.componentsContext = componentsContext(req.query[paramName]);
      next();
    };
  };
};
