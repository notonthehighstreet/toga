const { expect } = require('chai');
const sinon = require('sinon');
import proxyquire from 'proxyquire';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
let axiosStub;
let axiosStubArguments;
let fetchLib;
let fetch;
let json;

describe('fetch', ()=>{

  beforeEach(() => {
    axiosStub = ({ ...args }) => {
      axiosStubArguments = args;
      return Promise.resolve({ status: 200 });
    };
    fetchLib = proxyquire('./fetch', {
      'axios': axiosStub
    });
    fetch = fetchLib.fetch;
    json = fetchLib.json;
  });

  afterEach(()=>{
    sandbox.restore();
  });

  context(' URL ', ()=>{
    it('should return url with localhost by default', (done) => {
      const endpoint = chance.word();
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          headers: {},
          url: `http://localhost:undefined${endpoint}`
        })
        done()
      }).catch((e) => {
        done(e)
      })
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          headers: {},
          url: endpoint
        });
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      fetch.url(endpoint, { data }).then(()=>{
        expect(axiosStubArguments.data).to.equal(data);
        done()
      }).catch((e)=>{
        done(e)
      })
    });

    it('should return request options with params', (done) => {
      const endpoint = chance.word();
      const params = chance.sentence();
      fetch.url(endpoint, { params }).then(()=>{
        expect(axiosStubArguments.params).to.equal(params);
        done()
      }).catch((e)=>{
        done(e)
      })
    });

  });

});
