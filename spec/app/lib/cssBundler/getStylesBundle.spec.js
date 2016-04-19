const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../../../app/lib/cssBundler/getStylesBundle');

describe('getStylesBundle', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;

  beforeEach(() => {
    deps = {
      '/cache/set': function() {},
      '/lib/cssBundler/sass/compileBundle': function() {},
      '/lib/cssBundler/addPrefixes': function() {},
      '/lib/getComponentManifest': function() {},
      '/lib/getComponentDependencies': function() {},
      'lodash': require('lodash')
    };
    subject = builder(deps);
  });
  afterEach(() => {
    sandbox.reset();
  });

  describe('when multiple components are requested', () => {
    const componentNames = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word()
    ], 2);

    let cssContent;
    const setCacheSpy = sandbox.spy();

    beforeEach(() => {
      const getComponentManifest = sandbox.stub();
      const getComponentDependenciesStub = sandbox.stub();
      const addPrefixesSuccess = () => {
        return Promise.resolve(cssContent);
      };
      const compileBundleSuccess = () => {
        return Promise.resolve(cssContent);
      };

      cssContent = chance.word();
      deps['/cache/set'] = setCacheSpy;
      deps['/lib/getComponentManifest'] = getComponentManifest;
      deps['/lib/getComponentDependencies'] = getComponentDependenciesStub;
      deps['/lib/cssBundler/addPrefixes'] = addPrefixesSuccess;
      deps['/lib/cssBundler/sass/compileBundle'] = compileBundleSuccess;
      getComponentManifest.returnsArg(0);
      getComponentDependenciesStub.returnsArg(0);
    });
    it('returns the bundle', () => {
      const result = subject({componentNames});
      return result.then((stylesBundle) => {
        return expect(stylesBundle).to.be.eq(cssContent);
      });
    });
    it('caches the bundle', () => {
      const result = subject({componentNames});

      return result.then(() => {
        expect(setCacheSpy).to.have.been.calledWithMatch(/(styles-)+(\w-\w)*/g, cssContent);
      });
    });
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
