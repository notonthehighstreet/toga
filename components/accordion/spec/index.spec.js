import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import chanceMoudle from 'chance';
const chance = chanceMoudle();

const title = chance.word();
const content = chance.word();
import Accordion from '../';

describe('Accordion', () => {

  context('without content', () => {
    it('will render children', () => {
      const child = <div className="exampleChild"></div>;
      const component = shallow(<Accordion>{child}</Accordion>);
      expect(component.find('.exampleChild').length).to.eq(1);
    });

    it('wont render accordion.Header without a title', () => {
      const component = mount(<Accordion><Accordion.Header></Accordion.Header></Accordion>);
      expect(component.find('.toga-accordion__header').length).to.eq(0);
    });

    it('wont render accordion.Panel without content', () => {
      const component = mount(<Accordion><Accordion.Panel></Accordion.Panel></Accordion>);

      expect(component.find('.toga-accordion__panel').length).to.eq(0);
    });
  });

  context('with content', () => {
    it('will render children', () => {
      const child = <div className="exampleChild">random child</div>;
      const component = shallow(<Accordion>{child}</Accordion>);
      expect(component.find('.exampleChild').length).to.eq(1);
    });

    it('will render accordion.Header', () => {
      const component = mount(<Accordion><Accordion.Header>Header</Accordion.Header></Accordion>);
      expect(component.find('.toga-accordion__header').length).to.eq(1);
    });

    it('will render accordion.Panel', () => {
      const component = mount(<Accordion><Accordion.Panel>Panel Body</Accordion.Panel></Accordion>);
      expect(component.find('.toga-accordion__panel').length).to.eq(1);
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
      console.log(`component.find(Accordion.Panel).props()`, component.find(Accordion.Panel).props())
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
      expect(component).to.have.prop('aria-expanded', false);
    });

    it('has the hidden class', () => {
      const component = shallow(<Accordion.Panel>{ content }</Accordion.Panel>);
      expect(component).to.have.prop('aria-hidden', true);
    });

  });

  context('when expanded', () => {
    it('has the expanded class', () => {
      const component = shallow(<Accordion.Header expanded>{ title }</Accordion.Header>);
      expect(component).to.have.prop('aria-expanded', true);
    });

    it('does not have the hidden class', () => {
      const component = shallow(<Accordion.Panel expanded>{ content }</Accordion.Panel>);
      expect(component).to.have.prop('aria-hidden', false);
    });
  });
});
