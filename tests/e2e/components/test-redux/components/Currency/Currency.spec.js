import React from 'react';
import {shallow} from 'enzyme';
import Currency from './Currency';
import helper from 'tests/helper';

const {expect} = helper;

describe('Currency component', () => {
  it('renders correct currency symbol', () => {
    expect(shallow(<Currency code="GBP"/>).text()).to.equal('£', 'incorrect currency symbol');
    expect(shallow(<Currency code="AUD"/>).text()).to.equal('$', 'incorrect currency symbol');
    expect(shallow(<Currency code="USD"/>).text()).to.equal('$', 'incorrect currency symbol');
    expect(shallow(<Currency code="EUR"/>).text()).to.equal('€', 'incorrect currency symbol');
  });
  it('renders empty for unknown currency symbol', () => {
    expect(shallow(<Currency code="XXX"/>).text()).to.equal('', 'incorrect currency symbol');
    expect(shallow(<Currency code=""/>).text()).to.equal('', 'incorrect currency symbol');
  });
});
