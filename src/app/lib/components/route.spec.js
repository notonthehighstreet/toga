import { expect } from 'chai';
import sinon from 'sinon';
import Chance  from 'chance';
import builder from './route';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

const url = chance.url();

const mockDispatch = sandbox.stub();
const mockMatchPath = { default: sandbox.stub() };
const mockProps = { [chance.word()]: chance.word() };
const mockRequest = sandbox.stub();

const deps = {
  'react-router-dom/matchPath': mockMatchPath
};

describe('route', function() {
  let subject;
  let returnValue;
  const mockRoutes = [ { Component: { } } ];

  beforeEach(function() {
    subject = builder(deps);
  });

  afterEach(function() {
    sandbox.reset();
  });

  describe('getData', function() {
    context('with no needs in components', function() {
      beforeEach(function() {
        returnValue = subject.getData(mockRoutes, url, mockDispatch, mockProps);
      });

      it('should return a empty needs', function() {
        return returnValue.then(function(needs) {
          expect(needs).to.be.empty;
        });
      });
    });

    context('with empty needs', function() {
      beforeEach(function() {
        mockRoutes[0].Component.needs=[];

        returnValue = subject.getData(mockRoutes, url, mockDispatch, mockProps);
      });

      it('should return a empty needs', function() {
        return returnValue.then(function(needs) {
          expect(needs).to.be.empty;
        });
      });
    });

    context('with some needs', function() {
      const resultNeed = chance.word();

      beforeEach(function() {
        mockRoutes[0].Component.needs=[mockRequest];
        // match.default matches
        mockMatchPath.default.returns(true);
        mockRequest.returns(resultNeed);
        mockDispatch.returns(resultNeed);

        returnValue = subject.getData(mockRoutes, url, mockDispatch, mockProps);
      });

      it('should call matchPath.default', function() {
        return returnValue.then(function() {
          expect(mockMatchPath.default).to.have.been.calledOnce;
          expect(mockMatchPath.default).to.have.been.calledWith(url, { path: undefined, exact: undefined, strict: false });
        });
      });

      it('should call need', function() {
        return returnValue.then(function() {
          expect(mockRequest).to.have.been.calledOnce;
          expect(mockRequest).to.have.been.calledWith(mockProps);
        });
      });

      it('should call dispatch', function() {
        return returnValue.then(function() {
          expect(mockDispatch).to.have.been.calledOnce;
          expect(mockDispatch).to.have.been.calledWith(resultNeed);
        });
      });

      it('should return your needs', function() {
        return returnValue.then(function(result) {
          expect(result).to.eql([resultNeed]);
        });
      });
    });
  });

  describe('setData', function() {
    context('with no needs in components', function() {
      beforeEach(function() {
        returnValue = subject.setData(mockRoutes, mockDispatch, mockProps);
      });

      it('should return a empty data', function() {
        return returnValue.then(function(data) {
          expect(data).to.be.empty;
        });
      });
    });

    context('with some data', function() {
      const resultData = chance.word();

      beforeEach(function() {
        mockRoutes[0].Component.data=mockRequest;

        mockRequest.returns(resultData);
        mockDispatch.returns(resultData);

        returnValue = subject.setData(mockRoutes, mockDispatch, mockProps);
      });

      it('should call data', function() {
        return returnValue.then(function() {
          expect(mockRequest).to.have.been.calledOnce;
          expect(mockRequest).to.have.been.calledWith(mockProps);
        });
      });

      it('should call dispatch', function() {
        return returnValue.then(function() {
          expect(mockDispatch).to.have.been.calledOnce;
          expect(mockDispatch).to.have.been.calledWith(resultData);
        });
      });

      it('should return your needs', function() {
        return returnValue.then(function(result) {
          expect(result).to.eql([resultData]);
        });
      });
    });
  });
});
