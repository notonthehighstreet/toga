const _ = require('lodash');
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

module.exports = function setComponentsContext({paramName}) {
  return (req, res, next) => {
    req.componentsContext = componentsContext(req.query[paramName]);
    next();
  };
};
