import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
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

  });
});

describe('form  component', () => {

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
      renderedComponent = mount(<Row type="select" options={[]} />);
      componentDOM = renderedComponent.find(Field);
      expect(componentDOM).to.have.className('n-form__field');
      expect(componentDOM).to.have.className('n-form__field--select');
    });

    it('displays the options with value and label', () => {
      const option1 = 'blue';
      const option2 = 'two';
      renderedComponent = mount(<Row type="select" options={[
        { value: option1, label:'option1' },
        { value: option2, label:'option2' }
      ]} name="for" />);
      componentDOM = renderedComponent.find('option');
      expect(componentDOM).to.have.length(2);
      expect(componentDOM.first().props().value).to.eq(option1);
      expect(componentDOM.first().props().children).to.eq('option1');
      expect(componentDOM.last().props().value).to.eq(option2);
      expect(componentDOM.last().props().children).to.eq('option2');
    });

    it('displays the options with value as the label when label is missing', () => {
      const option1 = 'blue';
      const option2 = 'two';
      renderedComponent = mount(<Row type="select" options={[option1, option2]} name="for" />);
      componentDOM = renderedComponent.find('option');
      expect(componentDOM).to.have.length(2);
      expect(componentDOM.first().props().value).to.eq(option1);
      expect(componentDOM.first().props().children).to.eq(option1);
      expect(componentDOM.last().props().value).to.eq(option2);
      expect(componentDOM.last().props().children).to.eq(option2);
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
