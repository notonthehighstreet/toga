const expect = require('chai').expect;
const builder = require('../../../../app/lib/getComponentManifest');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const deps = {
  path: {
    join: sandbox.stub()
  }
};
const subject = builder(deps);

describe('getComponentManifest', () => {
  afterEach(() => {
    sandbox.reset();
  });
  describe('with a valid component name', () => {
    it('returns contents of the manifest file', () => {
      const componentName = 'component';
      const componentsPath = 'tests/spec/fixtures';
      const expectedManifest = require('../../fixtures/component/manifest.json');

      deps.path.join.returns(`../../${componentsPath}`);
      expect(subject(componentName, componentsPath)).to.deep.equal(expectedManifest);
    });
  });
});
