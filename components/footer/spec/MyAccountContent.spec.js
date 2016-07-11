import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import MyAccountContent from '../MyAccountContent';

describe('MyAccountContent', () => {
  it('renders logged in content', () => {
    const component = mount(<MyAccountContent loggedIn={true}/>);
    expect(component.find('.myaccount-content__signout')).to.be.present();
  });

  it('renders logged out content', () => {
    const component = mount(<MyAccountContent loggedIn={false}/>);
    expect(component.find('.logged-out-content__button--sign-in')).to.be.present();
  });

  it('when no loggedIn prop passed', () => {
    const component = mount(<MyAccountContent />);
    expect(component.find('.logged-out-content__button--sign-in')).to.be.present();
  });
});
