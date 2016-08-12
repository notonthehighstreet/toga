const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/setComponentContext');
const Chance = require('chance');
const chance = new Chance();

function BadRequestError() {}
const componentName = chance.word();
const component2Name = chance.word();

const fakeVendorBundleComponent = chance.word();
const getAppConfigMock = () => {
  return { vendorBundleComponent: fakeVendorBundleComponent };
};
const subject = builder({
  '/lib/getAppConfig': getAppConfigMock,
  '/lib/utils/errors': {BadRequestError}
});

describe('setComponentContext', () => {
  const sandbox = sinon.sandbox.create();
  const responseMock = {};
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the html context is requested', () => {
    const requestMock = {
      query: {},
      params: {componentName}
    };

    it('sets the assetType ', () => {
      subject.html(requestMock, responseMock, nextSpy);
      expect(requestMock.assetType).to.eq('html');
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('sets the component name ', () => {
      subject.html(requestMock, responseMock, nextSpy);
      expect(requestMock.componentName).to.eq(componentName);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('sets the raw to false', () => {
      subject.html(requestMock, responseMock, nextSpy);
      expect(requestMock.raw).to.eq(false);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('sets the raw to true', () => {
      requestMock.params[0] = true;
      subject.html(requestMock, responseMock, nextSpy);
      expect(requestMock.raw).to.eq(true);
      expect(nextSpy).to.have.been.calledOnce;
    });

    describe('when the context query param matches a request param', () => {
      describe('and the param is valid encoded json', () => {
        const context = {'hello': 'world'};
        const encodedContext = encodeURIComponent(JSON.stringify(context));
        const fakeRequest = {
          query: {
            context: encodedContext
          },
          params: {

          },
          path: '/components-vendor-bundle.js'
        };
        it('returns a context created from the json', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          expect(fakeRequest.context).to.deep.eq(context);
          expect(nextSpy.args[0] instanceof BadRequestError).to.be.false;
        });
      });
      describe('and the context contains a \'+\' character', () => {
        const context = encodeURIComponent(JSON.stringify({'csrf': 'sGm23r+w4t4.[]]}'}));
        const expectedContext = {'csrf': 'sGm23r+w4t4.[]]}'};
        const fakeRequest = {
          query: {
            context: context
          },
          params: {

          },
          path: '/components-vendor-bundle.js'
        };
        it('should not convert it to a space character', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          expect(fakeRequest.context).to.deep.eq(expectedContext);
          expect(nextSpy).to.have.been.calledOnce;
        });
      });
      describe('and the param is in-valid encoded json', () => {
        const fakeRequest = {
          query: {
            context: 'I am \' an invalid {json} encoded string;'
          },
          params: {

          }
        };
        it('propgates the error', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          expect(fakeRequest.context).to.be.undefined;
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
        });
      });
    });
  });

  describe('when the map context is requested', () => {

    it('detects it as a component and sets the componentPath ', () => {
      const minify = true;
      const requestMock = {
        query: {},
        params: {0: minify, 1: 'assetType', components: `${componentName}__${component2Name}`}
      };

      subject.map(requestMock, responseMock, nextSpy);
      expect(requestMock.components).to.deep.equal([componentName, component2Name]);
      expect(requestMock.assetType).to.eq('assetType.map');
      expect(requestMock.minify).to.eq(true);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('sets minify to false', () => {
      const minify = false;
      const requestMock = {
        query: {},
        params: {0: minify, 1: 'assetType', components: `${componentName}__${component2Name}`}
      };

      subject.map(requestMock, responseMock, nextSpy);
      expect(requestMock.minify).to.eq(false);
      expect(nextSpy).to.have.been.calledOnce;
    });
  });

  describe('when the asset context is requested', () => {

    it('passes correct assetType', () => {
      const assetType = chance.word();
      const requestMock = {
        query: {},
        params: {1: assetType, componentName: `${componentName}__${component2Name}`}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.assetType).to.eq(assetType);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('detects it as a minified component', () => {
      const minify = true;
      const requestMock = {
        query: {},
        params: {0: minify, componentName: `${componentName}__${component2Name}`}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.minify).to.equal(true);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('detects it as a toga components alternate url', () => {
      const fakeComponentName = chance.word();
      const requestMock = {
        query: {},
        params: {componentName: fakeComponentName}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.components).to.equal(fakeComponentName);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('detects broken component json', () => {
      const fakeComponentName = chance.word();
      const fakeComponents = fakeComponentName;
      const requestMock = {
        query: { components: fakeComponents},
        params: {componentName: 'components'}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.components).to.deep.equal(undefined);
      const firstCallArguments = nextSpy.args[0];
      return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
    });

    it('detects it as a toga component', () => {
      const fakeComponentName = [chance.word()];
      const fakeComponents = encodeURIComponent(JSON.stringify(fakeComponentName));
      const requestMock = {
        query: { components: fakeComponents},
        params: {componentName: 'components'}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.components).to.deep.equal(fakeComponentName);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('detects it as a vendor component', () => {
      const requestMock = {
        query: {},
        params: {componentName: 'components-vendor-bundle'}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.components).to.equal(fakeVendorBundleComponent);
      expect(nextSpy).to.have.been.calledOnce;
    });

    it('sets minify to false', () => {
      const minify = false;
      const requestMock = {
        query: {},
        params: { 0: minify, 1: 'js', componentName: `${componentName}__${component2Name}`}
      };

      subject.asset(requestMock, responseMock, nextSpy);
      expect(requestMock.minify).to.eq(false);
    });
  });
});
