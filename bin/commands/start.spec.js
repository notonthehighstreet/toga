const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const mockery = require('mockery');
const sandbox = sinon.sandbox.create();

let start;
const fakePath = chance.word();
const fakeAppServer = sandbox.stub().returns(Promise.resolve(fakePath));
global.process.cwd = sandbox.stub().returns('.');

describe('cli start', () => {

  beforeEach(() => {
    sandbox.reset();
    mockery.registerMock('../../script/start/startAppServer.js', fakeAppServer);
    mockery.registerMock('./toga.json', { components: { path: fakePath } });
    mockery.enable();
    start = require('./start');
  });

  it('returns a promise containing a path', () => {
    return start().then((path) => expect(path).to.eq(fakePath));
  });
});
