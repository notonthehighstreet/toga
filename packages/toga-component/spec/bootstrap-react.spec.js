const {expect} = require('chai');
const React = require('react');
const chance = new require('chance')();
const $ = require('jquery');

describe('Toga Component', () => {
  let subject;
  let fakeComponentName;
  let fakeComponentClassName;
  let FakeComponent;
  let fakePropertyName;

  beforeEach(() => {
    fakeComponentName = chance.word();
    fakeComponentClassName = chance.word();
    fakePropertyName = chance.word();
    FakeComponent = React.createClass({
      render() {
        return (
          <div className={fakeComponentClassName}>
            {this.props[fakePropertyName]}
          </div>
        );
      }
    });
    subject = require('../src/bootstrap-react');
  });
  afterEach(() => {
    $('body').empty();
  });
  describe('when no element with `toga` attribute for given component name exists in DOM', () => {
    beforeEach(() => {
      const togaElement = $('<div></div>');

      $('body').append(togaElement);
      subject({
        component: FakeComponent,
        componentName: fakeComponentName
      });
    });
    it('doesn\'t render a component', () => {
      expect($(`.${fakeComponentClassName}`).length).to.eq(0);
    });
  });
  describe('when element with `toga` attribute for given component name exists in DOM', () => {
    describe('when `props` attribute is valid JSON', () => {
      let fakeProps;

      beforeEach(() => {
        fakeProps = {
          [fakePropertyName]: chance.word()
        };
        const togaElement = $(`<div toga='${fakeComponentName}' props='${JSON.stringify(fakeProps)}'></div>`);

        $('body').append(togaElement);
        subject({
          component: FakeComponent,
          componentName: fakeComponentName
        });
      });
      it('renders a component', () => {
        expect($(`.${fakeComponentClassName}`).length).to.eq(1);
      });
      it('passes props from `props` attribute to relevant component', () => {
        expect($(`.${fakeComponentClassName}`).text()).to.eq(fakeProps[fakePropertyName]);
      });
    });
    describe('when `props` attribute is not valid JSON', () => {
      let fakeProps;

      beforeEach(() => {
        fakeProps = chance.word();
        const togaElement = $(`<div toga='${fakeComponentName}' props='${fakeProps}'></div>`);

        $('body').append(togaElement);
        subject({
          component: FakeComponent,
          componentName: fakeComponentName
        });
      });
      it('renders a component', () => {
        expect($(`.${fakeComponentClassName}`).length).to.eq(1);
      });
      it('does not pass props from `props` attribute to relevant component', () => {
        expect($(`.${fakeComponentClassName}`).text()).to.eq('');
      });
    });
  });
});
