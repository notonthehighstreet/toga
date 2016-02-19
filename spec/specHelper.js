const chai = require('chai');
const sinonChai = require('sinon-chai');
require('./setupComponentEnv');

chai.config.includeStack = true;
chai.expect();
chai.use(sinonChai);
setImmediate(function() {
  run();
});
