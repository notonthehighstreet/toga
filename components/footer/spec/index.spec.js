import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import chanceModule from 'chance';
const chance = chanceModule();

import MyAccountContent from '../MyAccountContent';

const name = chance.word();

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

  describe('footer', () => {
    context('My account menu', () => {
      it('when name is passed renders name as header', () => {
        const component = shallow(<Footer name={name} />);
        const myaccountList = component.find('.toga-footer__list--myaccount');
        expect(myaccountList.props().title).to.eq(name);
      });

      it('when name is not passed renders my account header', () => {
        const component = shallow(<Footer />);
        const myaccountList = component.find('.toga-footer__list--myaccount');
        expect(myaccountList.props().title).to.eq('my account');
      });

      it('passes logged in to my account content', () => {
        const component = shallow(<Footer loggedIn={true} />);
        const myAccountContent = component.find(MyAccountContent);
        expect(myAccountContent.props().loggedIn).to.be.true;
      });
    });
  });
});
