import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const mockery = require('mockery');

describe('config/index', () => {
  let subject;
  let builder;
  let semverMajorStub = sandbox.stub();
  let configFiles = [];
  let componentsArg = chance.word();

  const fakeAppName = chance.word();

  let appMetaDataStub = {
    name: fakeAppName,
    version: '1.2.3'
  };
  const deps = {
    yargs: {
      argv: {
        config: configFiles,
        components: componentsArg
      }
    },
    path: require('path'),
    semver: {
      major: semverMajorStub
    },
    'deep-assign': require('deep-assign'),
    'package.json': appMetaDataStub
  };

  const fakeApiVersion = chance.natural();
  semverMajorStub.returns(fakeApiVersion);
  const fakeComponents = { path: chance.word() };
  const fakeDefaultComponents = { path: chance.word() };
  const fakeVendor = { [chance.word()] : chance.word() };
  const fakeDefaultVendor = { [chance.word()] : chance.word() };
  const MockComponent = { components: fakeComponents, vendor: fakeVendor };
  const MockDefaultComponent = { components: fakeDefaultComponents, vendor: fakeDefaultVendor };

  before(() => {
    mockery.registerMock(`../../node_modules/${componentsArg}/toga.json`, MockComponent);
    mockery.registerMock('../.././toga.json', MockDefaultComponent);
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../../../app/config/index')];
  });

  afterEach(()=>{
    sandbox.reset();
  });

  describe('config has not been accessed previously', () => {
    beforeEach(() => {
      builder = require('../../../../app/config/index');
      subject = builder(Object.assign({}, deps));
    });
    it('sets application name', () => {
      let config = subject;
      expect(config.appName).to.equal(fakeAppName);
    });
    it('sets api version', () => {
      let config = subject;
      expect(config.apiVersion).to.equal(fakeApiVersion);
    });
  });
  describe('config has already been accessed', () => {
    let firstReadConfig;
    beforeEach(() => {
      builder = require('../../../../app/config/index');
      subject = builder(Object.assign({}, deps));
      firstReadConfig = subject;
    });

    it('returns a cached copy of the config', () => {
      let secondReadConfig = subject;
      expect(firstReadConfig).to.equal(secondReadConfig);
    });
  });
  describe('passed one config file', () => {
    beforeEach(() => {
      builder = require('../../../../app/config/index');
      configFiles = [
        './tests/spec/fixtures/config/a.json'
      ];
      subject = builder(Object.assign({}, deps,
        {
          yargs: {
            argv: {
              config: configFiles,
              components: componentsArg
            }
          }
        })
      );
    });
    it('contains the passed in config', () => {
      let config = subject;
      let expectedConfig = {
        'apiVersion': fakeApiVersion,
        'appName': fakeAppName,
        'name': 'a',
        'bar': 'foo',
        'nested': {
          'value': 123,
          'specificValue': 'a'
        },
        'components': {
          ...fakeComponents,
          path: 'node_modules/' + componentsArg + '/' + fakeComponents.path
        },
        'vendor': fakeVendor
      };
      expect(config).to.deep.equal(expectedConfig);
    });
  });
  describe('passed multiple config files', () => {
    describe('passed two different config files', () => {
      beforeEach(() => {
        builder = require('../../../../app/config/index');
        configFiles = [
          './tests/spec/fixtures/config/a.json',
          './tests/spec/fixtures/config/b.json'
        ];
        subject = builder(Object.assign({}, deps,
          {
            yargs: {
              argv: {
                config: configFiles,
                components: componentsArg
              }
            }
          })
        );
      });
      it('merges the second config on top of the first config', () => {
        let config = subject;
        let expectedConfig = {
          'apiVersion': fakeApiVersion,
          'appName': fakeAppName,
          'name': 'b',
          'foo': 'bar',
          'bar': 'foo',
          'nested': {
            'value': 555,
            'specificValue': 'a'
          },
          'components': {
            ...fakeComponents,
            path: 'node_modules/' + componentsArg + '/' + fakeComponents.path
          },
          'vendor': fakeVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });

    describe('the same config is re-applied after other config', () => {
      beforeEach(() => {
        builder = require('../../../../app/config/index');
        configFiles = [
          './tests/spec/fixtures/config/a.json',
          './tests/spec/fixtures/config/b.json',
          './tests/spec/fixtures/config/a.json'
        ];
        subject = builder(Object.assign({}, deps,
          {
            yargs: {
              argv: {
                config: configFiles,
                components: componentsArg
              }
            }
          })
        );
      });
      it('the third config overwrites changes made by the second', () => {
        let config = subject;
        let expectedConfig = {
          'apiVersion': fakeApiVersion,
          'appName': fakeAppName,
          'name': 'a',
          'foo': 'bar',
          'bar': 'foo',
          'nested': {
            'value': 123,
            'specificValue': 'a'
          },
          'components': {
            ...fakeComponents,
            path: 'node_modules/' + componentsArg + '/' + fakeComponents.path
          },
          'vendor': fakeVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });

    context('when a components arg isnt supplied', () => {
      beforeEach(() => {
        builder = require('../../../../app/config/index');
        subject = builder(Object.assign({}, deps,
          {
            yargs: {
              argv: {
                config: [ './tests/spec/fixtures/config/a.json']
              }
            }
          })
        );
      });
      it('loads the default config', () => {
        let config = subject;
        let expectedConfig = {
          'apiVersion': fakeApiVersion,
          'appName': fakeAppName,
          'name': 'a',
          'bar': 'foo',
          'nested': {
            'value': 123,
            'specificValue': 'a'
          },
          'components': {
            ...fakeDefaultComponents,
            path: './' + fakeDefaultComponents.path
          },
          'vendor': fakeDefaultVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });
  });
});
