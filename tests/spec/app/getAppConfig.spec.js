const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../app/lib/getAppConfig');

describe('Get App Config', () => {
  const sandbox = sinon.sandbox.create();
  const fakeYargs = {
    default: sandbox.stub()
  };
  const fakePath = {
    resolve: sandbox.stub()
  };
  const fakeSemver = {
    major: sandbox.stub()
  };
  let subject;
  let fakeDevConfigString;
  let fakeApplicationConfigString;
  let fakeOverridenConfigString;

  beforeEach(() => {
    fakeDevConfigString = chance.word();
    fakeApplicationConfigString = chance.word();
    fakeOverridenConfigString = chance.word();

    const fakeDeps = {
      yargs: fakeYargs,
      path: fakePath,
      semver: fakeSemver,
      '/config/devOverrides.json': {
        dev: fakeDevConfigString
      },
      '/config/application.json': {
        application: fakeApplicationConfigString
      },
      '/config/overrides.json': {
        overriddenConfig: fakeOverridenConfigString
      }
    };

    fakeYargs.default.returns(fakeYargs);
    subject = builder(fakeDeps);
  });
  afterEach(() => {
    sandbox.reset();
  });
  describe('when the `dev` argument is falsey', () => {
    it('does not assign dev config', () => {
      fakeYargs.argv = {
        dev: false
      };
      expect(subject().dev).to.be.undefined;
    });
  });
  describe('when the `dev` argument is a non-string truthy', () => {
    it('assigns dev config from deps', () => {
      fakeYargs.argv = {
        dev: true
      };
      expect(subject().dev).to.eq(fakeDevConfigString);
    });
  });
  describe('when the `dev` argument is a string', () => {
    it('assigns dev config json based on the `dev` argument', () => {
      fakeYargs.argv = {
        dev: 'config/devOverrides.json'
      };
      fakePath.resolve.returns('../../tests/spec/fixtures/config/devOverrides.json');
      expect(subject().dev).to.eq('required');
    });
  });
  describe('when the `config` argument is not a string', () => {
    it('assigns application config from deps', () => {
      fakeYargs.argv = {
        config: false
      };
      expect(subject().application).to.eq(fakeApplicationConfigString);
    });
  });
  describe('when the `config` argument is a string', () => {
    it('assigns application config json based on the `config` argument', () => {
      fakeYargs.argv = {
        config: 'config/application.json'
      };
      fakePath.resolve.returns('../../tests/spec/fixtures/config/application.json');
      expect(subject().application).to.eq(fakeApplicationConfigString);
      expect(subject().applicationMerged).to.eq('required');
    });
  });
});
