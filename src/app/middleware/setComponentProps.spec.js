const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('./setComponentProps');
const Chance = require('chance');
const chance = new Chance();

function BadRequestError() {}
const componentName = chance.word();

const fakeVendorBundleComponent = chance.word();
const configMock = () => ({ vendor: { componentName: fakeVendorBundleComponent } });
const subject = builder({
  '/config/index': configMock,
  '/lib/utils/errors': {BadRequestError}
});

describe('setComponentProps', () => {
  const sandbox = sinon.sandbox.create();
  const responseMock = {};
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the html props is requested', () => {
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

    describe('when the props query param matches a request param', () => {
      describe('and the param is valid encoded json', () => {
        const props = {'hello': 'world'};
        const stringifiedProps = JSON.stringify(props);
        const fakeRequest = {
          query: {
            props: stringifiedProps
          },
          params: {

          },
          path: '/components-vendor-bundle.js'
        };
        it('returns a props created from the json', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          expect(fakeRequest.props).to.deep.eq(props);
        });
      });
      describe('and the props contain un-encoded characters', () => {
        const props = encodeURIComponent(JSON.stringify({'csrf': 'sGm23r+w4t4.[]]}'}));
        const fakeRequest = {
          query: {
            props
          },
          params: {

          },
          path: '/components-vendor-bundle.js'
        };
        it('should return bad request error', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          let firstCallArguments = nextSpy.args[0];
          expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
        });
      });
      describe('and the param is in-valid encoded json', () => {
        const fakeRequest = {
          query: {
            props: 'I am \' an invalid {json} encoded string;'
          },
          params: {

          }
        };
        it('propgates the error', () => {
          subject.html(fakeRequest, responseMock, nextSpy);
          expect(fakeRequest.props).to.be.undefined;
          let firstCallArguments = nextSpy.args[0];
          return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
        });
      });
    });
  });
});
