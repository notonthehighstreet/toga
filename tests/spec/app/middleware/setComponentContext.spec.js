const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/setComponentContext');
function BadRequestError() { }

const subject = builder({
  '/middleware/errors/badRequestError': BadRequestError,
  'lodash': require('lodash')
});

describe('setComponentContext', () => {
  const sandbox = sinon.sandbox.create();
  const fakeResponse = {};
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the context query param matches a request param', () => {
    describe('and the param is valid encoded json', () => {
      const context = {'hello': 'world'};
      const encodedContext = encodeURIComponent(JSON.stringify(context));
      const fakeRequest = {
        query: {
          context: encodedContext
        }
      };
      it('returns a context created from the json', () => {
        subject(fakeRequest, fakeResponse, nextSpy);
        expect(fakeRequest.componentContext).to.deep.eq(context);
        expect(nextSpy).to.have.been.calledOnce;
      });
    });
    describe('and the param is in-valid encoded json', () => {
      const fakeRequest = {
        query: {
          context: 'I am \' an invalid {json} encoded string;'
        }
      };
      it('propgates the error', () => {
        subject(fakeRequest, fakeResponse, nextSpy);
        expect(fakeRequest.componentContext).to.be.undefined;
        let firstCallArguments = nextSpy.args[0];
        return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
      });
    });
    it('should set vendor as the coponent when the requested path is the vendor.js', () => {
      const context = {'hello': 'world'};
      const encodedContext = encodeURIComponent(JSON.stringify(context));
      const fakeRequest = {
        query: {
          context: encodedContext
        },
        path: '/components-vendor-bundle.js'
      };
      it('returns a context created from the json', () => {
        subject(fakeRequest, fakeResponse, nextSpy);
        expect(fakeRequest.componentContext).to.deep.eq(context);
        expect(fakeRequest.components).to.deep.eq('vendor');
        expect(nextSpy).to.have.been.calledOnce;
      });
    });
  });
});
