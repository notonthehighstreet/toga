const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

describe('getComponentManifest', () => {
  const sandbox = sinon.sandbox.create();
  let getManifestByPathStub;
  let subject;

  beforeEach(() => {
    getManifestByPathStub = sandbox.spy();
    subject = rewire('../../../lib/lib/getComponentManifest');
    subject.__set__({
      getManifestByPath: getManifestByPathStub
    });
  });
  describe('with a valid component name', () => {
    it('builds the correct path to the manifest file', () => {
      const componentName = 'foo';

      subject(componentName);

      expect(
        getManifestByPathStub
          .withArgs(`../../components/${componentName}/manifest.json`)
          .calledOnce
      ).to.be.true;
    });
  });
});
