import createChance from 'chance';
import {expect} from 'chai';
import sinon from 'sinon';

const exportObj = Object.create({}, {
  sandbox: {
    get: () => {
      return sinon.sandbox.create();
    },
    enumerable: true
  },
  chance: {
    value: createChance(),
    enumerable: true
  },
  expect: {
    value: expect,
    enumerable: true
  }
});

export default exportObj;
