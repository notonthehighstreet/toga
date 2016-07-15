import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LinksList from '../index';

describe('links list', () => {
  it('renders each link', () => {
    const component = shallow(<LinksList links={[{href:'example.com', label: 'example dot com'}, {href:'example.com', label:'example dot com'}]} />);
    expect(component.find('li').length).to.eq(2);
    expect(component.find('a').length).to.eq(2);
  });

  it('when no links passed does not render any links', () => {
    const component = shallow(<LinksList />);
    expect(component.find('li').length).to.eq(0);
    expect(component.find('a').length).to.eq(0);
  });

  context('rendered link', () => {
    let component;
    let firstLink;
    before(() => {
      component = shallow(<LinksList links={[{href:'example.com', label: 'example dot com'}, {href:'example.com', label: 'example dot com'}]} />);
      firstLink = component.find('a').first();
    });

    it('has label as content', () => {
      expect(firstLink.text()).to.eq('example dot com');
    });

    it('applies other props', () => {
      expect(firstLink.find('a').props().href).to.eq('example.com');
    });
  });
});
