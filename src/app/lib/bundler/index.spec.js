const expect = require('chai').expect;
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('./index');
import { fakeReject } from '../../../../tests/commonMocks';

describe('bundler/index', () => {
  const sandbox = sinon.sandbox.create();
  let deps;
  let subject;
  let result;
  let fakeComponentsList;
  const errorMessage = chance.word();
  const bundleFailureError = new Error(errorMessage);
  const bundleFailureMock = fakeReject(bundleFailureError);
  const fakeNotFoundError = sandbox.stub().throws();
  const fakeBundleError = sandbox.stub().throws();

  afterEach(() => {
    sandbox.reset();
  });

  describe('the bundle is not successful', () => {

    deps = {
      '/lib/bundler/bundle': bundleFailureMock,
      '/lib/utils/errors': {
        NotFoundError: fakeNotFoundError,
        BundleError: fakeBundleError
      }
    };
    subject = builder(deps);
    fakeComponentsList = chance.pickset([
      chance.word(),
      chance.word(),
      chance.word(),
      chance.word()
    ], 2);

    it('returns an error', () => {
      result = subject(fakeComponentsList);

      return result.catch((error) => {
        expect(fakeNotFoundError).not.to.have.been.called;
        expect(fakeBundleError).to.have.been.calledWith(errorMessage);
        expect(error).to.be.an.instanceOf(Error);
      });
    });
  });
});
