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
      const component = shallow(<Accordion><Accordion.Title></Accordion.Title></Accordion>);
      expect(component.find(Accordion.Title).length).to.eq(0);
    });

    it('wont render accordion.content without content', () => {
      const component = shallow(<Accordion><Accordion.Content></Accordion.Content></Accordion>);
      expect(component.find(Accordion.Content).length).to.eq(0);
    });

  });

  context('with a proper structure and content', () => {

    let component;

    beforeEach(() => {
      component = shallow(<Accordion>
        <Accordion.Title>{ title }</Accordion.Title>
        <Accordion.Content>{ content }</Accordion.Content>
      </Accordion>);
    });

    it('will render accordion title + content', () => {
      expect(component.find(Accordion.Title).length).to.eq(1);
      expect(component.find(Accordion.Content).length).to.eq(1);
    });

    it('defaults to closed', () => {
      expect(component.find(Accordion.Title).props().expanded).to.eq(false);
      expect(component.find(Accordion.Content).props().expanded).to.eq(false);
    });

    it('opens when clicked', () => {
      component.find(Accordion.Title).simulate('click');
      expect(component.find(Accordion.Title).props().expanded).to.eq(true);
      expect(component.find(Accordion.Content).props().expanded).to.eq(true);
    });

    it('closes when open and clicked', () => {
      component.find(Accordion.Title).simulate('click');
      component.find(Accordion.Title).simulate('click');
      expect(component.find(Accordion.Title).props().expanded).to.eq(false);
      expect(component.find(Accordion.Content).props().expanded).to.eq(false);
    });
  });

  context('when not expanded', () => {
    it('does not have the expanded class', () => {
      const component = shallow(<Accordion.Title>{ title }</Accordion.Title>);
      expect(component).not.to.have.className('expanded');
    });

    it('has the hidden class', () => {
      const component = shallow(<Accordion.Content>{ content }</Accordion.Content>);
      expect(component).to.have.className('hidden-mobile');
    });

  });

  context('when expanded', () => {
    it('has the expanded class', () => {
      const component = shallow(<Accordion.Title expanded>{ title }</Accordion.Title>);
      expect(component).to.have.className('expanded');
    });

    it('does not have the hidden class', () => {
      const component = shallow(<Accordion.Content expanded>{ content }</Accordion.Content>);
      expect(component).not.to.have.className('hidden-mobile');
    });
  });
});
