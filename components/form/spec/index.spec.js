import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Field from '../';

describe('form component', () => {
  let renderedComponent;
  let componentDOM;

  it('is contained within a row', () => {
    renderedComponent = shallow(<Field  />);
    componentDOM = renderedComponent.find('.n-form__row input');
    expect(componentDOM).to.have.length(1);
  });

  it('adds additional class name', () => {
    renderedComponent = shallow(<Field className="test"/>);
    componentDOM = renderedComponent.find('.n-form__row');
    expect(componentDOM.props().className).to.eq('n-form__row test');
  });

  it('has a label linked to the input box (i.e. htmlFor)', () => {
    renderedComponent = shallow(<Field name="for" />);
    const labelDOM = renderedComponent.find('Label');
    componentDOM = renderedComponent.find('input');
    expect(labelDOM.props().htmlFor).to.eq('for');
    expect(componentDOM.props().id).to.eq('for');
    expect(componentDOM.props().name).to.eq('for');
  });

  context('rendering a select field', () => {
    it.skip('throws when options are missing', () => {
      // renderedComponent = shallow(<Field type="select" />);
      // expect(renderedComponent).to.throw();
    });

    it('has n class names', () => {
      renderedComponent = shallow(<Field type="select" options={[]} />);
      componentDOM = renderedComponent.find('.n-form__field');
      expect(componentDOM.props().className).to.eq('n-form__field n-form__field--select');
    });

    it('displays the options with value and label', () => {
      const option1 = 'blue';
      const option2 = 'two';
      renderedComponent = shallow(<Field type="select" options={[
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
      renderedComponent = shallow(<Field type="select" options={[option1, option2]} name="for" />);
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
      // renderedComponent = shallow(<Field type="submit" />);
      // expect(renderedComponent).to.throw();
    });

    it('has n class names', () => {
      renderedComponent = shallow(<Field type="submit" value="submit" />);
      componentDOM = renderedComponent.find('.n-form__field');
      expect(componentDOM.props().className).to.eq('n-button n-button--primary n-form__field n-form__field--submit');
    });

  });

  context('rendering inputs', () => {
    it.skip('throws when name is missing', () => {
      // renderedComponent = shallow(<Field />);
      // expect(renderedComponent).to.throw();
    });

    it.skip('throws when type is missing', () => {
      // renderedComponent = shallow(<Field />);
      // expect(renderedComponent).to.throw();
    });

    it('has n class names', () => {
      renderedComponent = shallow(<Field name="example" type="text" />);
      componentDOM = renderedComponent.find('.n-form__field');
      expect(componentDOM.props().className).to.eq('n-form__field n-form__field--input');
    });

  });
});
