import { expect } from 'chai';
import sinon from 'sinon';
import Chance  from 'chance';
import builder from './require';
import mockery from 'mockery';
import { fakeDebug } from '../../../../tests/commonMocks';

const chance = new Chance();

let sandbox = sinon.sandbox.create();

const fakeModulePaths = [chance.file()];
const fakeComponentName = chance.word();

const fakeRelativeComponentPath = `../../components/${fakeComponentName}`;
const fakeComponentInfo = [{ requirePath : fakeRelativeComponentPath, path : chance.word(),  file: fakeModulePaths[0],  name: chance.word() }];
const fakeGetComponentInfo = sandbox.stub().returns(fakeComponentInfo);

const fakeInternalServerError = sandbox.stub().throws();

const deps = {
  '/lib/utils/errors': { InternalServerError: fakeInternalServerError },
  '/lib/getComponentInfo': fakeGetComponentInfo,
  debug: fakeDebug
};

describe('require', function() {
  let subject = builder(deps);

  afterEach(() => {
    sandbox.reset();
  });

  describe('successful require component', function() {
    const MockComponent = { default: () => {} };

    before(() => {
      mockery.registerMock(fakeRelativeComponentPath, MockComponent);
      mockery.enable();
    });

    after(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    it('should return component', function() {
      return subject(fakeComponentName).then(({ component }) => {
        expect(fakeGetComponentInfo).to.have.been.calledWith(fakeComponentName);
        expect(component).to.eq(MockComponent);
      });
    });

    it('should return path', function() {
      return subject(fakeComponentName).then(({ path }) => {
        expect(fakeGetComponentInfo).to.have.been.calledWith(fakeComponentName);
        expect(path).to.eq(fakeComponentInfo[0].requirePath);
      });
    });
  });

  describe('should raise an error', function() {
    const expectToThrow = () => expect(fakeInternalServerError).to.have.thrown;

    it('when call upon', function() {
      return subject(fakeComponentName).then(expectToThrow).catch(expectToThrow);
    });
  });
});
