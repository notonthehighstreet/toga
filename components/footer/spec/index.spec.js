import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import chanceModule from 'chance';
import Footer from '../';

const chance = chanceModule();

import MyAccountContent from '../../my-account';
import FooterLinks from '../../links-list';
import linksObject from '../links';

const name = chance.word();

describe('footer component', () => {
  let renderedOutput;

  beforeEach(() => {
    renderedOutput = shallow(<Footer />);
  });
  describe('initial state', () => {
    it('renders Copyright as child component', () => {
      expect(renderedOutput).to.be.ok;
    });
  });

  context('My account menu', () => {
    it('when name is passed renders name as header', () => {
      const component = mount(<Footer name={name} />);
      const myaccountList = component.find('.toga-footer__list--myaccount').find('.toga-footer__title');
      expect(myaccountList.text()).to.eq(name);
    });

    it('when name is not passed renders my account header', () => {
      const component = mount(<Footer />);
      const myaccountList = component.find('.toga-footer__list--myaccount').find('.toga-footer__title');
      expect(myaccountList.text()).to.eq('my account');
    });

    it('passes logged in to my account content', () => {
      const component = shallow(<Footer loggedIn={true} />);
      const myAccountContent = component.find(MyAccountContent);
      expect(myAccountContent.props().loggedIn).to.be.true;
    });
  });

  context('sponsored product feature flag in the about-us section', () => {
    it('renders the sponsored product link when on', () => {
      const component = shallow(<Footer sponsoredProductFeature={true} />);
      const footerlinks = component.find('.toga-footer__list--about-us').find(FooterLinks);
      expect(footerlinks.last().props().links).to.deep.equal(linksObject.sponsored);
    });
    it('does not render the sponsored product link when off', () => {
      const component = shallow(<Footer />);
      const footerlinks = component.find('.toga-footer__list--about-us').find(FooterLinks);
      expect(footerlinks.last().props().links).to.deep.equal(linksObject.about);
    });
  });
});
