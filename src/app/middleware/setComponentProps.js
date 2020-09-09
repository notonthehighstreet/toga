module.exports = (deps) => {
  const {
    '/lib/utils/errors': { BadRequestError },
    '/config/index': getConfig,
    url
  } = deps;
  const config = getConfig();

  const encodeJson = (props) => {
    return (props === undefined)
      ? {}
      : JSON.parse(props);
  };

  const parse = (props, next) => {
    try {
      return encodeJson(props);
    }
    catch(error) {
      return next(new BadRequestError(`Invalid props: ${props}`, error));
    }
  };

  return {
    html(req, res, next) {
      req.componentName = req.params.componentName;
      req.props = parse(req.query.props, next);
      req.assetType = 'html';
      req.raw = /raw/.test(req.params[0]);
      req.preview = /preview/.test(req.params[0]);
      next();
    }
  };
};
