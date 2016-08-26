import { expect } from 'chai';
import React from 'react';
import { shallow, render } from 'enzyme';
import Chance from 'chance';
import Svg from './';

const chance = new Chance();
const svg = '<svg class="test-svg" xmlns="http://www.w3.org/2000/svg" />';
const b64Prefix = 'data:image/svg+xml;base64,';
const b64 = 'PHN2ZyBjbGFzcz0idGVzdC1zdmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+';
const defaultMockProps = {
  id: chance.word(),
  className: chance.word()
};

describe('Svg', () => {
  it('Passes props through', () => {
    const mockProps = Object.assign({}, defaultMockProps, { markup: ''});
    const component = shallow(<Svg {...mockProps} />);
    const { id, className } = component.props();
    expect(id).to.eql(defaultMockProps.id);
    expect(className).to.contain('toga-svg');
    expect(className).to.contain(defaultMockProps.className);
  });

  it('renders svg markup as a svg', () => {
    const mockProps = Object.assign({}, defaultMockProps, { markup: svg});
    const component = render(<Svg {...mockProps} />);
    const svgs = component.find('svg');
    const imgs = component.find('img');
    expect(svgs.length).to.equal(1);
    expect(imgs.length).to.equal(0);
  });

  it('renders base64 as a image', () => {
    const mockProps = Object.assign({}, defaultMockProps, { markup: `${b64Prefix}${b64}`});
    const component = render(<Svg {...mockProps} />);
    const svgs = component.find('svg');
    const imgs = component.find('img');
    expect(svgs.length).to.equal(0);
    expect(imgs.length).to.equal(1);
  });
});
