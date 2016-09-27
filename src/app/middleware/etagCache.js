module.exports = (deps) => {
  const {
    '/lib/bundler/buildHash': buildHash
  } = deps;

  const hash = buildHash();

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
