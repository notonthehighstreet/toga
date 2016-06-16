const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../../app/middleware/setComponentsContext');
function BadRequestError() { }

const subject = builder({
  '/middleware/errors/badRequestError': BadRequestError,
  'lodash': require('lodash')
});

describe('setComponentsContext', () => {
  const sandbox = sinon.sandbox.create();
  const fakeResponse = {};
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when the context query param matches a request param', () => {
    const contextParam = 'haha';
    describe('and the param is valid encoded json', () => {
      const context = {'hello': 'world'};
      const encodedContext = encodeURIComponent(JSON.stringify(context));
      const fakeRequest = {
        query: {
          [contextParam]: encodedContext
        }
      };
      it('returns a context created from the json', () => {
        let middleware = subject({paramName: contextParam});
        middleware(fakeRequest, fakeResponse, nextSpy);
        expect(fakeRequest.componentsContext).to.deep.eq(context);
        expect(nextSpy).to.have.been.calledOnce;
      });
    });
    describe('and the param is in-valid encoded json', () => {
      const fakeRequest = {
        query: {
          [contextParam]: 'I am \' an invalid {json} encoded string;'
        }
      };
      it('propgates the error', () => {
        let middleware = subject({paramName: contextParam});
        middleware(fakeRequest, fakeResponse, nextSpy);
        expect(fakeRequest.componentsContext).to.be.undefined;
        let firstCallArguments = nextSpy.args[0];
        return expect(firstCallArguments[0] instanceof BadRequestError).to.be.true;
      });
    });
  });

  describe('when the context query param does not match a request param', () => {
    const fakeRequest = {
      query: {}
    };
    it('returns an empty context', () => {
      let middleware = subject({paramName: 'haha'});
      middleware(fakeRequest, fakeResponse, nextSpy);
      expect(fakeRequest.componentsContext).to.deep.eq({});
      expect(nextSpy).to.have.been.calledOnce;
    });
  });
});
