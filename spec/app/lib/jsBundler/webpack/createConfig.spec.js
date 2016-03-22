const builder = require('../../../../../app/lib/jsBundler/webpack/createConfig');
const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const sandbox = sinon.sandbox.create();
const fakeWebpack = {
  optimize: {
    CommonsChunkPlugin: function() {},
    DedupePlugin: function() {},
    OccurrenceOrderPlugin: function() {}
  },
  DefinePlugin: function() {}
};
describe('Create Webpack Config', () => {
  let subject;
  const definePluginSpy = sandbox.spy(fakeWebpack, 'DefinePlugin');

  beforeEach(() => {
    subject = builder({
      '/constants': chance.word(),
      webpack: fakeWebpack
    });
  });
  afterEach(() => {
    sandbox.reset();
  });
  after(() => {
    sandbox.restore();
  });
  it('when definitions are passed, creates config object with definitions', () => {
    const fakeDefinitions = {
      [chance.word()]: chance.word()
    };
    const result = subject({
      modulePaths: [],
      definitions: fakeDefinitions,
      vendorBundleFileName: chance.word()
    });

    expect(definePluginSpy).to.have.been.calledWith(fakeDefinitions);
    expect(result.plugins[3]).to.be.an.instanceof(fakeWebpack.DefinePlugin);
  });
  it('when definitions are not passed, creates config object without definitions', () => {
    subject({
      modulePaths: [],
      vendorBundleFileName: chance.word()
    });
    expect(definePluginSpy).not.to.have.been.called;
  });
});
