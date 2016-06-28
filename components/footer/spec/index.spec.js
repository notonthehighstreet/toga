import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

describe('footer component', () => {
  let Footer;
  let renderedOutput;

  beforeEach(() => {
    Footer = require('../');
    renderedOutput = shallow(<Footer />);
  });
  describe('initial state', () => {
    it('renders Copyright as child component', () => {
      expect(renderedOutput).to.be.ok;
    });
  });
});
