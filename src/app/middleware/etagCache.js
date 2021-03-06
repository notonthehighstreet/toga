module.exports = (deps) => {
  const {
    '/lib/utils/buildHash': buildHash
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

  const setETagHeader = (req, res, next) => {
    res.set('etag', returnHash());
    next();
  };

  return { etagRequest, returnHash, setETagHeader };
};
