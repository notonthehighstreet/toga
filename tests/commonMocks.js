const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

export const fakeYargs = {
  default: sandbox.stub(),
  argv: {config: []}
};

export const fakePath = {
  resolve: sandbox.stub(),
  join: sandbox.spy()
};

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

export const fakePromise = sandbox.spy(() => {
  return Promise.resolve();
});

export const fakeResolve = (resolved) => sandbox.spy(() => {
  return Promise.resolve(resolved);
});

export const fakeReject = (rejected) => sandbox.spy(() => {
  return Promise.reject(rejected);
});

export const fakeFs = {
  stat: sandbox.stub(),
  readFile: sandbox.stub(),
  writeFile: sandbox.stub()
};

export const fakePromisify = (promise) => {
  return promise;
};

export const fakeWebpack = sandbox.stub().returns({
  run: sandbox.stub().returns(Promise.resolve())
});
