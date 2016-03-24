const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const builder = require('../../app/cache/get');

describe('Cache get', () => {
  const sandbox = sinon.sandbox.create();
  const deps = {
    'lodash': require('lodash')
  };
  const subject = builder(deps);

  afterEach(() => {
    sandbox.reset();
  });
  describe('when data for key exists', () => {
    it('returns data', () => {
      const fakeData = chance.word();
      const dataExists = () => Promise.resolve(fakeData);

      deps['/cache/redis/get'] = dataExists;

      return expect(subject(chance.word)).to.eventually.equal(fakeData);
    });
  });
  describe('when no data for key exists', () => {
    it('throws error', () => {
      const fakeData = null;
      const dataIsNull = () => Promise.resolve(fakeData);

      deps['/cache/redis/get'] = dataIsNull;

      return expect(subject(chance.word())).to.be.rejected;
    });
  });
});
