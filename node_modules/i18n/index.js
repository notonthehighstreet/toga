'use strict';

var config = {
  defaultLocale: 'en'
};

var middleware = function (req, res, next) {
  res.locals.locale = req.query.locale || config.defaultLocale;
  next();
};

module.exports = {
  middleware: middleware
};
