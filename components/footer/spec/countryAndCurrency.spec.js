import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import chanceModule from 'chance';
import CountryAndCurrency from '../CountryAndCurrency';
import sinon from 'sinon';
import iso from '../iso';

const chance = chanceModule();
const token = chance.word();

const sandbox = sinon.sandbox.create();

const fetchStub = sandbox.stub(iso, 'fetch').returns(Promise.resolve({status: 200}));
const reloadStub = sandbox.stub(location, 'reload');

describe('countryAndCurrency component', () => {
  let renderedOutput;

  beforeEach(() => {
    sandbox.reset();
    const context = { csrf: token };
    renderedOutput = mount(<CountryAndCurrency country="GB-1" currency="GBP" />, { context });
  });

  describe('default values set by props', () => {
    it('country prop', () => {
      expect(renderedOutput.state().country).to.eq('GB-1');
    });

    it('currency prop', () => {
      expect(renderedOutput.state().currency).to.eq('GBP');
    });
  });

  describe('render select defaults', () => {
    it('country', () => {
      const countries = renderedOutput.find('[name=\'extended_country_code\']');
      expect(countries.node.value).to.eq('GB-1');
    });

    it('currency', () => {
      const currency = renderedOutput.find('[name=\'currency\']');
      expect(currency.node.value).to.eq('GBP');
    });
  });

  describe('changing country', () => {
    const countryCode = 'BB-8';

    it('updates country state', () => {
      const country = renderedOutput.find('[name=\'extended_country_code\']');
      country.simulate('change', { target: { value: countryCode}});
      expect(renderedOutput.state().country).to.eq(countryCode);
    });
  });

  describe('changing currency', () => {
    const currencyCode = 'USD';

    it('updates currency state', () => {
      const currency = renderedOutput.find('[name=\'currency\']');
      currency.simulate('change', { target: { value: currencyCode}});
      expect(renderedOutput.state().currency).to.eq(currencyCode);
    });
  });

  describe('updates country and currency', () => {

    const payload = {
      data: { currency: 'GBP', extended_country_code: 'GB-1', utf8: true }, // eslint-disable-line
      headers: { 'X-CSRF-Token': token },
      method: 'PUT',
      withCredentials: true,
      url: '/geo'
    };

    context('submit form updates', () => {
      it('submits correct payload', () => {
        const updateCta = renderedOutput.find('button');
        updateCta.simulate('click');
        expect(fetchStub).to.be.called;
        expect(fetchStub).to.be.calledWith(payload);
      });

      it('reloads on success', (done) => {
        const updateCta = renderedOutput.find('button');
        updateCta.simulate('click');

        setImmediate(()=>{
          expect(reloadStub).to.be.called;
          done();
        });
      });

      context('Failure scenarios', ()=> {
        let fetchErrorStub;

        beforeEach(()=> {
          fetchStub.restore();
          fetchErrorStub = sandbox.stub(iso, 'fetch').returns(Promise.reject({}));
        });

        afterEach(()=> {
          fetchErrorStub.restore();
        });

        it('throws error on failure', (done) => {
          const updateCta = renderedOutput.find('button');
          updateCta.simulate('click');

          setImmediate(() => {
            expect(reloadStub).to.be.called;
            done();
          });
        });
      });

    });
  }); 

});
