const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const hook = require('node-hook').hook;
const chaiEnzyme = require('chai-enzyme');

hook('.scss', () => {});
hook('.svg', () => {});
hook('.png', () => {});

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
require('./setupComponentEnv');

chai.config.includeStack = true;
chai.expect();
chai.use(sinonChai);
