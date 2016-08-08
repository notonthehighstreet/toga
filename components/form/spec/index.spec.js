import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Chance from 'chance';
const chance = new Chance();
import Row, { Field, Label } from '../';
import button from '../../button';

let renderedComponent;
let componentDOM;

describe('form component', () => {
  context('form Field', () => {

    it('passes tref as a ref prop', () => {
      let input;
      renderedComponent = mount(<Field tref= { (node) => input = node }  />);
      expect(typeof input).to.equal('object');
    });

    it('allows children to be passed', () => {
      renderedComponent = mount(<Field type="select"><optgroup><option>{chance.word()}</option></optgroup></Field>);
      const option = renderedComponent.find('option');
      const optgroup = renderedComponent.find('optgroup');
      expect(option).to.have.length(1);
      expect(optgroup).to.have.length(1);
    });

  });

  it('is contained within a row', () => {
    renderedComponent = shallow(<Row />);
    expect(renderedComponent).to.have.className('n-form__row');
  });

  it('adds additional class name', () => {
    renderedComponent = shallow(<Row className="test"/>);
    componentDOM = renderedComponent.find('.n-form__row');
    expect(componentDOM.props().className).to.eq('n-form__row test');
  });

  it('has a label linked to the input box (i.e. htmlFor)', () => {
    renderedComponent = mount(<Row name="for" />);
    const labelDOM = renderedComponent.find(Label);
    componentDOM = renderedComponent.find(Field);
    expect(labelDOM.props().htmlFor).to.eq('for');
    expect(componentDOM.props().id).to.eq('for');
    expect(componentDOM.props().name).to.eq('for');
  });

  context('rendering a select field', () => {
    it.skip('throws when options are missing', () => {
      // renderedComponent = shallow(<Row type="select" />);
      // expect(renderedComponent).to.throw();
    });

    it('has n class names', () => {
      renderedComponent = mount(<Row type="select" />);
      componentDOM = renderedComponent.find(Field);
      expect(componentDOM).to.have.className('n-form__field');
      expect(componentDOM).to.have.className('n-form__field--select');
    });
  });

  context('rendering a submit button', () => {
    it.skip('throws when value is missing', () => {
      // renderedComponent = shallow(<Row type="submit" />);
      // expect(renderedComponent).to.throw();
    });

    it('is a Button component', () => {
      renderedComponent = mount(<Row type="submit" value="submit" />);
      componentDOM = renderedComponent.find(button);
      expect(componentDOM).to.have.length(1);
    });

    it('has n class names', () => {
      renderedComponent = mount(<Row type="submit" value="submit" />);
      componentDOM = renderedComponent.find(Field);
      expect(componentDOM).to.have.className('n-form__field');
      expect(componentDOM).to.have.className('n-form__field--submit');
    });

  });

  context('rendering inputs', () => {
    it.skip('throws when name is missing', () => {
      // renderedComponent = shallow(<Row />);
      // expect(renderedComponent).to.throw();
    });

    it.skip('throws when type is missing', () => {
      // renderedComponent = shallow(<Row />);
      // expect(renderedComponent).to.throw();
    });

    it('has n class names', () => {
      renderedComponent = mount(<Row name="example" type="text" />);
      componentDOM = renderedComponent.find(Field);
      expect(componentDOM).to.have.className('n-form__field');
      expect(componentDOM).to.have.className('n-form__field--input');
    });

  });
});
