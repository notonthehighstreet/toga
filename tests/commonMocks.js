const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

export const fakeLogger = () => {
  return {
    error: sandbox.spy()
  };
};

export const fakeDebug = () => () => {
  return {
    log: sandbox.stub()
  };
};

export const fakeResolve = (resolved) => sandbox.spy(() => {
  return Promise.resolve(resolved);
});

