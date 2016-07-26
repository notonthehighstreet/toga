import {expect} from 'chai';
import sinon from 'sinon';
import createChance from 'chance';

const sandbox = sinon.sandbox.create();
const chance = createChance();

describe('Get App Config', () => {
  let builder;
  let subject;
  let deepAssignStub = sandbox.stub();
  let semverMajorStub = sandbox.stub();
  const deps = {
    yargs: {argv: {config: []}},
    path: require('path'),
    semver: {
      major: semverMajorStub
    },
    'deep-assign': deepAssignStub
  };

  beforeEach(() => {
    sandbox.reset();
    delete require.cache[require.resolve('../../../app/lib/getAppConfig')];
    builder = require('../../../app/lib/getAppConfig');
    subject = builder(deps);
  });
  it('caches config', () => {
    const fakeConfig = {
      foo: 'bar'
    };

    deepAssignStub.returns(fakeConfig);
    expect(subject()).to.deep.equal(fakeConfig);
    deepAssignStub.returns({});
    subject = builder(deps);
    expect(subject()).to.deep.equal(fakeConfig);
  });
  it('sets application name', () => {
    subject();
    expect(deepAssignStub.args[0][2].appName).to.eq('noths-frontend');
  });
  it('sets api version', () => {
    const fakeApiVersion = chance.natural();

    semverMajorStub.returns(fakeApiVersion);
    subject();
    expect(deepAssignStub.args[0][2].apiVersion).to.eq(fakeApiVersion);
  });
  it('merges properties of multiple config objects in given order', () => {
    subject = builder(Object.assign({}, deps,
      {
        yargs: {
          argv: {
            config: [
              './tests/spec/fixtures/config/a.json',
              './tests/spec/fixtures/config/b.json'
            ]
          }
        }
      })
    );
    subject();
    deepAssignStub.calledWith(
      sinon.match({}),
      sinon.match({
        'name': 'a',
        'bar': 'foo',
        'nested': {
          'value': 123,
          'specificValue': 'a'
        }
      })
    );
    deepAssignStub.calledWith(
      sinon.match({
        'name': 'a',
        'bar': 'foo',
        'nested': {
          'value': 123,
          'specificValue': 'a'
        }
      }),
      sinon.match({
        'name': 'b',
        'foo': 'bar',
        'nested': {
          'value': 555
        }
      })
    );
  });
});

