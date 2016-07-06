import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import FooterLinks from '../FooterLinks';

describe('Footer links', () => {
  it('renders each link', () => {
    const component = shallow(<FooterLinks links={[{href:'example.com', name: 'example dot com'}, {href:'example.com', name:'example dot com'}]} />);
    expect(component.find('.toga-footerAccordion__link').length).to.eq(2);
  });

  it('when no links passed does not render any links', () => {
    const component = shallow(<FooterLinks />);
    expect(component.find('.toga-footerAccordion__link').length).to.eq(0);
  });

  context('rendered link', () => {
    let component;
    let firstLink;
    before(() => {
      component = shallow(<FooterLinks links={[{href:'example.com', name: 'example dot com'}, {href:'example.com', name: 'example dot com'}]} />);
      firstLink = component.find('.toga-footerAccordion__link').first();
    });

    it('has name as content', () => {
      expect(firstLink.text()).to.eq('example dot com');
    });

    it('link anchor href is set', () => {
      expect(firstLink.find('a').props().href).to.eq('example.com');
    });
  });
});
