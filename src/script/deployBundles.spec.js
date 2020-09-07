const { expect } = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const Chance = require('chance');
const chance = new Chance();
const proxyquire = require('proxyquire');

const on = sandbox.spy();
const uploadDir = sandbox.stub().returns({ on });
const createClient = sandbox.stub().returns({ uploadDir });
const fakeS3 = { createClient };
const fakeConfig = {
  aws: { key: chance.word(), bucket: chance.word(), secret: chance.word() },
  assets : { prefix: chance.word() }
};

describe('deployBundle', () => {

  beforeEach(() => {
    proxyquire('./deployBundles',  {
      '@auth0/s3': fakeS3,
      '../app/config/application': fakeConfig
    });
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('Creates an s3 client', () => {
    expect(createClient).to.be.calledWith(
      {
        s3Options: {
          accessKeyId: fakeConfig.aws.key,
          secretAccessKey: fakeConfig.aws.secret
        }
      }
      );
  });

  it('uploads with the correct config', () => {
    expect(uploadDir).to.be.called;
    expect(uploadDir).to.be.calledWith(
      {
        localDir: 'dist/components',
        s3Params: {
          ACL:'public-read',
          Bucket: fakeConfig.aws.bucket,
          CacheControl: `max-age=${60*60*24*365}`,
          Prefix: `${fakeConfig.assets.prefix}/`
        }
      }
      );
  });
});
