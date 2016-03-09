const expect = require('chai').expect;
const builder = require('../../../app/lib/getComponentManifest');
const subject = builder();

describe('getComponentManifest', () => {
  describe('with a valid component name', () => {
    it('returns contents of the manifest file', () => {
      const componentName = 'component';
      const componentsPath = '../../spec/fixtures';
      const expectedManifest = require('../../fixtures/component/manifest.json');

      expect(subject(componentName, componentsPath)).to.deep.equal(expectedManifest);
    });
  });
});
