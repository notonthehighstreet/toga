import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import chanceMoudle from 'chance';
const chance = chanceMoudle();

const title = chance.word();
const content = chance.word();
import Accordion from '../';

describe('Accordion', () => {

  context('without a proper structure and content', () => {
    it('wont render children', () => {
      const child = <div className="exampleChild"></div>;
      const component = shallow(<Accordion></Accordion>);
      expect(component.find(child).length).to.eq(0);
    });

    it('wont render accordion.title without a title', () => {
      const component = shallow(<Accordion><Accordion.Header></Accordion.Header></Accordion>);
      expect(component.find(Accordion.Header).length).to.eq(0);
    });

    it('wont render accordion.content without content', () => {
      const component = shallow(<Accordion><Accordion.Panel></Accordion.Panel></Accordion>);
      expect(component.find(Accordion.Panel).length).to.eq(0);
    });

  });

  context('with a proper structure and content', () => {

    let component;

    beforeEach(() => {
      component = shallow(<Accordion>
        <Accordion.Header>{ title }</Accordion.Header>
        <Accordion.Panel>{ content }</Accordion.Panel>
      </Accordion>);
    });

    it('will render accordion title + content', () => {
      expect(component.find(Accordion.Header).length).to.eq(1);
      expect(component.find(Accordion.Panel).length).to.eq(1);
    });

    it('defaults to closed', () => {
      expect(component.find(Accordion.Header).props().expanded).to.eq(false);
      expect(component.find(Accordion.Panel).props().expanded).to.eq(false);
    });

    it('opens when clicked', () => {
      component.find(Accordion.Header).simulate('click');
      expect(component.find(Accordion.Header).props().expanded).to.eq(true);
      expect(component.find(Accordion.Panel).props().expanded).to.eq(true);
    });

    it('closes when open and clicked', () => {
      component.find(Accordion.Header).simulate('click');
      component.find(Accordion.Header).simulate('click');
      expect(component.find(Accordion.Header).props().expanded).to.eq(false);
      expect(component.find(Accordion.Panel).props().expanded).to.eq(false);
    });
  });

  context('when not expanded', () => {
    it('does not have the expanded class', () => {
      const component = shallow(<Accordion.Header>{ title }</Accordion.Header>);
      expect(component).not.to.have.className('expanded');
    });

    it('has the hidden class', () => {
      const component = shallow(<Accordion.Panel>{ content }</Accordion.Panel>);
      expect(component).to.have.className('hidden--mobile');
    });

  });

  context('when expanded', () => {
    it('has the expanded class', () => {
      const component = shallow(<Accordion.Header expanded>{ title }</Accordion.Header>);
      expect(component).to.have.className('expanded');
    });

    it('does not have the hidden class', () => {
      const component = shallow(<Accordion.Panel expanded>{ content }</Accordion.Panel>);
      expect(component).not.to.have.className('hidden--mobile');
    });
  });
});
