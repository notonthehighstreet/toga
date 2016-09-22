const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const mockery = require('mockery');
const sandbox = sinon.sandbox.create();

let start;
const fakePath = chance.word();
const fakeLogEnv = chance.word();
const fakeAppServer = sandbox.stub().returns(Promise.resolve(fakePath));
global.process.cwd = sandbox.stub().returns('.');

describe('cli start', () => {

  beforeEach(() => {
    sandbox.reset();
    mockery.registerMock('../../dist/script/start/startAppServer.js', fakeAppServer);
    mockery.registerMock('./toga.json', { components: { path: fakePath } });
    mockery.enable();
    start = require('./start');
  });

  it('returns a promise containing a path', () => {
    return start({}).then((path) => expect(path).to.eq(fakePath));
  });

  it('uses the dist version of the scripts', () => {
    return start({}).then(() => expect(fakeAppServer).to.be.calledWith());
  });

  it('sets a default log location as root', () => {
    return start({}).then(() => {
      expect(process.env.TOGA_LOGFILE).to.equal('./toga.logstash.log');
      delete process.env.TOGA_LOGFILE;
    });
  });

  it('doesnt set a default log location if environment var exists', () => {
    process.env.TOGA_LOGFILE = fakeLogEnv;
    return start({}).then(() => {
      expect(process.env.TOGA_LOGFILE).to.equal(fakeLogEnv);
      delete process.env.TOGA_LOGFILE;
    });
  });
});
