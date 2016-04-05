const { expect } = require('chai');
const sinon = require('sinon');
const chance = new require('chance')();
const factory = require('../../../../app/routes/components/assets');

describe('assets router', () => {
  const sandbox = sinon.sandbox.create();
  const fakeExpress = {
    Router: sandbox.stub(),
    static: sandbox.stub()
  };
  const fakeRouter = {
    use: sandbox.stub()
  };
  let subject;

  fakeExpress.Router.returns(fakeRouter);
  beforeEach(() => {
    subject = factory({ express: fakeExpress });
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('builds a route', () => {
    const createdRouter = subject();

    expect(createdRouter.use).to.have.been.calledOnce;
  });
  it('builds a static route based on url', () => {
    const fakeReq = {
      params: {
        component: chance.word(),
        path: chance.word()
      }
    };
    const fakeRes = {};
    const fakeNext = {};
    const fakeStaticMiddleware = sandbox.spy();
    const expected = `components/${fakeReq.params.component}/assets/${fakeReq.params.path}`;

    fakeRouter.use.yields(fakeReq, fakeRes, fakeNext);
    fakeExpress.static.returns(fakeStaticMiddleware);
    subject();
    expect(fakeExpress.static).to.have.been.calledWith(expected);
    expect(fakeStaticMiddleware).to.have.been.calledWith(fakeReq, fakeRes, fakeNext);
  });
});
