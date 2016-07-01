import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import chanceMoudle from 'chance';
const chance = chanceMoudle();

const title = chance.word();
const links = [{href:'', title:''}, {href:'', title:''}, {href:'', title:''}];
import FooterAccordion from '../FooterAccordion';

describe('FooterAccordion', () => {
  it('renders title', () => {
    const component = shallow(<FooterAccordion title={title} />);
    expect(component.find('.toga-footerAccordion__header').text()).to.eq(title);
  });

  it('renders children', () => {
    const component = shallow(<FooterAccordion links={links}/>);
    expect(component.find('.toga-footerAccordion__link').length).to.eq(3);
  });

  it('defaults to closed', () => {
    const component = shallow(<FooterAccordion links={links}/>);
    expect(component.find('.toga-footerAccordion__links').props().className).to.include('hidden');
    expect(component.find('.toga-footerAccordion__header').props().className).to.not.include('expanded');
  });

  it('opens when clicked', () => {
    const component = shallow(<FooterAccordion links={links}/>);
    component.find('.toga-footerAccordion__header').simulate('click');
    expect(component.find('.toga-footerAccordion__links').props().className).to.not.include('hidden');
  });

  it('closes when open and clicked', () => {
    const component = shallow(<FooterAccordion links={links}/>);
    component.find('.toga-footerAccordion__header').simulate('click');
    component.find('.toga-footerAccordion__header').simulate('click');
    expect(component.find('.toga-footerAccordion__links').props().className).to.include('hidden');
  });

  it('adds expanded class to header when clicked', () => {
    const component = shallow(<FooterAccordion />);
    component.find('.toga-footerAccordion__header').simulate('click');
    expect(component.find('.toga-footerAccordion__header').props().className).to.include('expanded');
  });

  it('removes expanded class when clicked again', () => {
    const component = shallow(<FooterAccordion />);
    component.find('.toga-footerAccordion__header').simulate('click');
    expect(component.find('.toga-footerAccordion__header').props().className).to.include('expanded');
  });
});
