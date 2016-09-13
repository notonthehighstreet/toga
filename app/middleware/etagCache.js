module.exports = (deps) => {
  const {
    '/lib/getComponentInfo': getComponentInfo,
    '/lib/bundler/buildHash': buildHash,
  } = deps;

  const componentInfo = getComponentInfo();
  const hash = buildHash([componentInfo[0].root]);

  const returnHash = () => hash;

  const etagRequest = (req, res, next) => {
    if(req.get('If-None-Match') === hash) {
      res.sendStatus(304);
    }
    else {
      next();
    }
  };

  return { etagRequest, returnHash };
};
