import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MyAccount from '../index';

describe('MyAccount', () => {
  it('renders logged in content', () => {
    const component = mount(<MyAccount loggedIn={true}/>);
    expect(component.find('button').text()).to.equal('sign out');
  });

  it('renders logged out content', () => {
    const component = mount(<MyAccount loggedIn={false}/>);
    expect(component.find('a').first().text()).to.equal('sign in');
  });

  it('when no loggedIn prop passed', () => {
    const component = mount(<MyAccount />);
    expect(component.find('a').first().text()).to.equal('sign in');
  });
});
