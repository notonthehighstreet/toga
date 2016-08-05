const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');
const builder = require('../../../../app/middleware/setComponentContext');
function BadRequestError() { }

const subject = builder({
  '/lib/utils/errors': { BadRequestError },
  'lodash': require('lodash')
});

describe('setComponentPath', () => {
  const sandbox = sinon.sandbox.create();
  const componentPath = 'path/to/component';
  const responseMock = {};
  const componentFileTypes = ['html', 'raw.html', 'js', 'css', 'json'];
  const nextSpy = sandbox.spy();

  afterEach(() => {
    sandbox.reset();
  });

  _.each(componentFileTypes, (fileType) => {
    describe(`when the file type request is ${fileType}`, () => {
      const requestMock = {
        path: `${componentPath}.${fileType}`,
        query: {}
      };

      it('detects it as a component and sets the componentPath ', () => {
        subject(requestMock, responseMock, nextSpy);
        expect(requestMock.componentPath).to.eq(componentPath);
        expect(nextSpy).to.have.been.calledOnce;
      });
    });
  });

  describe('when the file type is catface', () => {
    const fileType = 'catface';
    const requestMock = {
      path: `${componentPath}.${fileType}`
    };

    it('does not set the componentPath', () => {
      subject(requestMock, responseMock, nextSpy);
      expect(nextSpy.args[0][0] instanceof BadRequestError).to.be.true;
      expect(nextSpy).to.have.been.calledOnce;
    });
  });
});
