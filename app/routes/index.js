'use strict';

module.exports = function(app) {
  require('./public')(app);
  require('./components')(app);

  return app;
}
