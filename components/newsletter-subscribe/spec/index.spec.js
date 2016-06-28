import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Newsletter from '../index';

describe('Newsletter subscribe component', () => {
  it('should render', () => {
    const component = shallow(<Newsletter/>);
    expect(component).to.be.ok;
  });

  context('slogan', () => {
    it('renders slogan in english', () => {
      const component = shallow(<Newsletter locale='en'/>);
      const slogan = component.find('.slogan');
      expect(slogan.text()).to.eq('UNIQUE. INSPIRING. Our emails aren\'t like other emails.');
    });

    it('renders key if text for locale is not found', () => {
      const component = shallow(<Newsletter locale='NOPE'/>);
      const slogan = component.find('.slogan');
      expect(slogan.text()).to.eq('UNIQUE_INSPIRING');
    });
  });
});
