const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const hook = require('node-hook').hook;

hook('.scss', () => {});

chai.use(chaiAsPromised);
require('./setupComponentEnv');

chai.config.includeStack = true;
chai.expect();
chai.use(sinonChai);
