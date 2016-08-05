import { expect } from 'chai';
import sinon from 'sinon';

const sandbox = sinon.sandbox.create();

describe('redis client', () => {
  let subject;
  let builder;
  let redisStub = sandbox.stub();
  let redisClientMock = {
    on: sandbox.stub()
  };
  redisStub.returns(redisClientMock);

  let appConfigStub = sandbox.stub();
  let redisConfigStub = sandbox.stub();
  appConfigStub.returns({
    redis: redisConfigStub
  });

  const deps = {
    ioredis: redisStub,
    '/lib/getAppConfig': appConfigStub
  };

  beforeEach(() => {
    delete require.cache[require.resolve('../../../../../app/cache/redis/client')];
    builder = require('../../../../../app/cache/redis/client');
    subject = builder(deps);
  });
  afterEach(() => {
    sandbox.reset();
  });

  it('sets up a connection failure handler', () => {
    subject();
    expect(redisClientMock.on).have.been.calledWith('close');
  });

  it('sets up a connection closed handler', () => {
    subject();
    expect(redisClientMock.on).have.been.calledWith('close');
  });

  describe('an existing connection has been created', () => {
    let firstConnection;
    let redisClientMockTwo = sandbox.stub();
    beforeEach(() => {
      redisStub.onFirstCall().returns(redisClientMock).onSecondCall().returns(redisClientMockTwo);
      firstConnection = subject();
    });
    it('re-uses the previous connection', () => {
      let secondConnection = subject();
      expect(firstConnection).to.equal(secondConnection);
      expect(redisStub).to.have.been.called.once;
    });
  });
});
