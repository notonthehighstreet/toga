const expect = require('chai').expect;
const chance = new require('chance')();
const builder = require('../../../../app/lib/cssBundler/getStylesBundle');

describe('getVendorBundle', () => {
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      '/cache/get': function() {},
      '/cache/set': function() {},
      '/lib/cssBundler/sass/compileBundle': function() {},
      '/lib/cssBundler/addPrefixes': function() {},
      '/lib/getComponentManifest': function() {},
      '/lib/getComponentDependencies': function() {},
      'lodash': require('lodash')
    };
    subject = builder(deps);
  });

  describe('when component names are passed in non-array format', () => {
    const componentNames = chance.word();
    const noComponentsErrorMessage = 'getStylesBundle `components` parameter needs to be an Array';

    it('returns an error', () => {
      const result = subject({componentNames});
      return result.catch((error) => {
        expect(error).to.be.eq(noComponentsErrorMessage);
      });
    });
  });
});
