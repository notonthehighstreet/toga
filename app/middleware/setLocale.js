module.exports = () => {
  return function setLocale(req, res, next) {
    const config = {
      defaultLocale: 'en'
    };

    req.locale = req.query.locale || config.defaultLocale;
    next();
  };
};
