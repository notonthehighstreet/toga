const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
require('./setupComponentEnv');

chai.config.includeStack = true;
chai.expect();
chai.use(sinonChai);
setImmediate(function() {
  run();
});
