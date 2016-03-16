const expect = require('chai').expect;
const sinon = require('sinon');
const builder = require('../../../app/lib/getTogaStyles');

describe('getTogaStyles', () => {
  const sandbox = sinon.sandbox.create();
  const styleKitCss = 'stylekit css';
  const togaCss = 'toga css';
  const getAppConfig = () => {
    return {
      stylesToolkit: {
        url: 'stylekit url'
      }
    };
  };
  const requestPromiseStub = {
    get: () => {
      return Promise.resolve(styleKitCss);
    }
  };
  const promisifyStub = () => {
    return () => {
      return Promise.resolve(togaCss);
    };
  };
  const compileStub = (css) => {
    return new Promise((resolve) => resolve(`compiled ${css.stylesheetContent}`));
  };
  const subject = builder({
    'es6-promisify': promisifyStub,
    'fs': {},
    'request-promise': requestPromiseStub,
    '/lib/getAppConfig': getAppConfig,
    '/lib/cssBundler/compile': compileStub
  });

  afterEach(() => {
    sandbox.reset();
  });

  it('concats and returns toolkit and toga styles', () => {
    let result = subject();
    return result.then((css) => {
      return expect(css).to.eq('compiled toga css\nstylekit css');
    });
  });
});
