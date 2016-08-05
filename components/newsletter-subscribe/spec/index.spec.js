import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Newsletter from '../index';
import { Field } from '../../form';

describe('Newsletter subscribe component', () => {
  it('should render', () => {
    const component = shallow(<Newsletter/>);
    expect(component).to.be.ok;
  });

  context('slogan', () => {
    it('renders slogan in english', () => {
      const component = shallow(<Newsletter locale='en'/>);
      const slogan = component.find('.toga-newsletter-subscribe__slogan');
      expect(slogan.text()).to.eq('UNIQUE. INSPIRING. Our emails aren\'t like other emails.');
    });

    it('renders key if text for locale is not found', () => {
      const component = shallow(<Newsletter locale='NOPE'/>);
      const slogan = component.find('.toga-newsletter-subscribe__slogan');
      expect(slogan.text()).to.eq('UNIQUE_INSPIRING');
    });

    it('updates the class name on input change', () => {
      const component = mount(<Newsletter locale='NOPE'/>);
      const input = component.find(Field).first();
      expect(typeof input.props().tref).to.eq('function');
      expect(input).not.to.have.className('toga-newsletter-subscribe__input--has-text');

      input.simulate('change', {target: {value: 'My new value'}});

      expect(input).to.have.className('toga-newsletter-subscribe__input--has-text');
    });
  });
});
