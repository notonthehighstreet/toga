'use strict';

var config = {
  defaultLocale: 'en'
};

module.exports = (req, res, next) => {
  req.locale = req.query.locale || config.defaultLocale;
  next();
};
