const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/middleware/setMountNodeId');

describe('setMountNodeId', () => {
  const sandbox = sinon.sandbox.create();
  const cryptoMock = {
    createHash: sandbox.stub(),
    update: function(hashSource) {
      this.hashSource = hashSource;
      return this;
    },
    digest: function() {
      return `hash${this.hashSource}`;
    }
  };
  cryptoMock.createHash.returns(cryptoMock);
  const subject = builder({
    'crypto': cryptoMock
  });
  const fakeResponse = {};
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  describe('when a mount node id was specified in the query params', () => {
    const mountNodeId = 'aMountNodeId';
    const fakeRequest = {
      query: {
        mountNodeId: mountNodeId
      }
    };
    it('sets the mount node id to the the query parameter', () => {
      subject(fakeRequest, fakeResponse, nextSpy);
      expect(fakeRequest.mountNodeId).to.eq(mountNodeId);
      expect(nextSpy).to.have.been.calledOnce;
    });
  });
  describe('when a mount node id was not specified in the query params', () => {
    const componentPath = 'aComponentPath';
    const mountNodeId = `hash${componentPath}`.slice(0, 8);
    const fakeRequest = {
      query: {},
      componentPath: componentPath
    };
    it('sets the mount node id to first 8 chars of a hash of the component path', () => {
      subject(fakeRequest, fakeResponse, nextSpy);
      expect(fakeRequest.mountNodeId).to.eq(mountNodeId);
      expect(nextSpy).to.have.been.calledOnce;
    });
  });
});
