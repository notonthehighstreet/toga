import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';

const sandbox = sinon.sandbox.create();
const chance = new Chance();
const mockery = require('mockery');

describe('config/index', () => {
  let subject;
  let builder;
  let configFiles = [];
  let componentsArg = chance.word();

  const fakeComponents = { path: chance.word() };
  const fakeDefaultComponents = { path: chance.word() };
  const fakeVendor = { [chance.word()] : chance.word() };
  const fakeCWD = chance.word();
  const fakeDefaultVendor = { [chance.word()] : chance.word() };
  const MockComponent = { components: fakeComponents, vendor: fakeVendor };
  const MockDefaultComponent = { components: fakeDefaultComponents, vendor: fakeDefaultVendor };
  let oldCWD;

  before(() => {
    mockery.registerMock(`${fakeCWD}/node_modules/${componentsArg}/toga.json`, MockComponent);
    mockery.registerMock(`${fakeCWD}/components/toga.json`, MockDefaultComponent);
    oldCWD = process.cwd;
    process.cwd = sandbox.stub().returns(fakeCWD);

  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
    process.cwd = oldCWD;
  });

  beforeEach(() => {
    delete require.cache[require.resolve('./index')];
  });

  afterEach(()=>{
    sandbox.reset();
  });

  describe('config has not been accessed previously', () => {
    beforeEach(() => {
      mockery.registerMock(`${fakeCWD}/node_modules/components/toga.json`, MockDefaultComponent);
      mockery.registerMock(`${fakeCWD}/node_modules/${fakeComponents.path}/toga.json`, MockComponent);
      mockery.registerMock(`${fakeCWD}/components/toga.json`, MockDefaultComponent);
      mockery.registerMock(`${fakeCWD}/${fakeComponents.path}/toga.json`, MockComponent);
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
      });
      builder = require('./index')();
    });

    context('when a componentPath is passed as an arg', () => {
      it('sets components.path pointing to node_modules', () => {
        subject = builder(fakeComponents.path);
        expect(subject.components.path).to.equal(`${fakeCWD}/node_modules/${fakeComponents.path}/${fakeComponents.path}`);
      });

      it('sets components.path pointing locally', () => {
        subject = builder('./' + fakeComponents.path);
        expect(subject.components.path).to.equal(`${fakeCWD}/${fakeComponents.path}/${fakeComponents.path}`);
      });
    });
  });

  describe('config has already been accessed', () => {
    let firstReadConfig;
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
      });
      builder = require('./index')();
      subject = builder();
      firstReadConfig = subject;
    });

    it('returns a cached copy of the config', () => {
      let secondReadConfig = subject;
      expect(firstReadConfig).to.equal(secondReadConfig);
    });
  });
  describe('passed one config file', () => {
    beforeEach(() => {
      configFiles = [
        '../tests/spec/fixtures/config/a.json'
      ];
      mockery.registerMock('yargs', {
        argv: {
          config: configFiles,
          components: componentsArg
        }
      });
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
      });
      builder = require('./index')();
      subject = builder();
    });
    it('contains the passed in config', () => {
      let config = subject;
      let expectedConfig = {
        'name': 'a',
        'bar': 'foo',
        'nested': {
          'value': 123,
          'specificValue': 'a'
        },
        'components': {
          ...fakeComponents,
          base: `${fakeCWD}/node_modules/`,
          path: `${fakeCWD}/node_modules/${componentsArg}/${fakeComponents.path}`,
          packageJson: `${fakeCWD}/node_modules/${componentsArg}/package.json`
        },
        'vendor': fakeVendor
      };
      expect(config).to.deep.equal(expectedConfig);
    });
  });
  describe('passed multiple config files', () => {
    describe('passed two different config files', () => {
      beforeEach(() => {
        configFiles = [
          '../tests/spec/fixtures/config/a.json',
          '../tests/spec/fixtures/config/b.json'
        ];
        mockery.registerMock('yargs', {
          argv: {
            config: configFiles,
            components: componentsArg
          }
        });
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false
        });
        builder = require('./index')();
        subject = builder();
      });
      it('merges the second config on top of the first config', () => {
        let config = subject;
        let expectedConfig = {
          'name': 'b',
          'foo': 'bar',
          'bar': 'foo',
          'nested': {
            'value': 555,
            'specificValue': 'a'
          },
          'components': {
            ...fakeComponents,
            base: `${fakeCWD}/node_modules/`,
            packageJson: `${fakeCWD}/node_modules/${componentsArg}/package.json`,
            path: `${fakeCWD}/node_modules/${componentsArg}/${fakeComponents.path}`
          },
          'vendor': fakeVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });

    describe('the same config is re-applied after other config', () => {
      beforeEach(() => {
        configFiles = [
          '../tests/spec/fixtures/config/a.json',
          '../tests/spec/fixtures/config/b.json',
          '../tests/spec/fixtures/config/a.json'
        ];
        mockery.registerMock('yargs', {
          argv: {
            config: configFiles,
            components: componentsArg
          }
        });
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false
        });
        builder = require('./index')();
        subject = builder();
      });
      it('the third config overwrites changes made by the second', () => {
        let config = subject;
        let expectedConfig = {
          'name': 'a',
          'foo': 'bar',
          'bar': 'foo',
          'nested': {
            'value': 123,
            'specificValue': 'a'
          },
          'components': {
            ...fakeComponents,
            base: `${fakeCWD}/node_modules/`,
            packageJson: `${fakeCWD}/node_modules/${componentsArg}/package.json`,
            path: `${fakeCWD}/node_modules/${componentsArg}/${fakeComponents.path}`
          },
          'vendor': fakeVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });

    context('when a components arg isnt supplied', () => {
      beforeEach(() => {
        mockery.registerMock('yargs', {
          argv: {
            config: [ '../tests/spec/fixtures/config/a.json']
          }
        });
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false
        });
        builder = require('./index')();
        subject = builder();
      });
      it('loads the default config', () => {
        let config = subject;
        let expectedConfig = {
          'name': 'a',
          'bar': 'foo',
          'nested': {
            'value': 123,
            'specificValue': 'a'
          },
          'components': {
            ...fakeDefaultComponents,
            base: `${fakeCWD}/`,
            packageJson: `${fakeCWD}/components/package.json`,
            path: `${fakeCWD}/components/${fakeDefaultComponents.path}`
          },
          'vendor': fakeDefaultVendor
        };
        expect(config).to.deep.equal(expectedConfig);
      });
    });
  });
});
