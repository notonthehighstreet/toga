'use strict';

var chai = require('chai');
var sinonChai = require('sinon-chai');
require('./setupComponentEnv');
chai.config.includeStack = true;
chai.expect();
chai.use(sinonChai);
