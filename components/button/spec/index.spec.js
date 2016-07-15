import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import chanceModule from 'chance';
const chance = chanceModule();

import Button from '../';

const className = chance.word();
const id = chance.word();
const href = chance.word();

describe('Button component', () => {

  context('by default', () => {
    const component = shallow(<Button />);

    it('renders Button as a button element', () => {
      expect(component).to.have.className('n-button');
      expect(component).to.have.tagName('button');
    });

    it('renders primary Button', () => {
      expect(component).to.have.className('n-button--primary');
    });

    it('renders a small Button ', () => {
      expect(component).to.have.className('n-button--small');
    });
  });

  context('when it has an href prop', () => {
    const component = shallow(<Button href={ href } />);
    it('renders as an anchor', () => {
      expect(component).to.have.className('n-button');
      expect(component).to.have.tagName('a');
    });

    it('renders with an href attribute', () => {
      expect(component).to.have.attr('href', href);
    });
  });

  context('when it other props', () => {
    it('renders secondary Button', () => {
      const component = shallow(<Button secondary />);
      expect(component).to.have.className('n-button--secondary');
    });

    it('renders a medium Button ', () => {
      const component = shallow(<Button size="medium" />);
      expect(component).to.have.className('n-button--medium');
    });

    it('renders a large Button ', () => {
      const component = shallow(<Button size="large" />);
      expect(component).to.have.className('n-button--large');
    });

    it('renders a full-width Button ', () => {
      const component = shallow(<Button fullWidth />);
      expect(component).to.have.className('n-button--full-width');
    });

    it('passes additional className ', () => {
      const component = shallow(<Button className={ className } />);
      expect(component).to.have.className('n-button');
      expect(component).to.have.className(className);
    });

    it('passes unknown props ', () => {
      const component = shallow(<Button id={ id } />);
      expect(component).to.have.attr('id', id);
    });
  });
});
