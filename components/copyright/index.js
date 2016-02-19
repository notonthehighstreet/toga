const React = require('react');
const togaComponent = require('toga-component');

module.exports = ({locale}) => {
  const phrases = require('./i18n.json')[locale];
  const t = togaComponent.createT({phrases});
  const Copyright = React.createClass({
    render() {
      return (
        <div
          className={`copyright-text${this.state.BOOM ? ' highlighted' : ''}`}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          &copy; 2016 - {t('THANKS')} {this.props.one}
        </div>
      );
    },
    getInitialState() {
      return {
        'BOOM': false
      };
    },
    onMouseOver() {
      this.setState({
        'BOOM': true
      });
    },
    onMouseOut() {
      this.setState({
        'BOOM': false
      });
    }
  });

  return togaComponent.wrapComponent(Copyright, 'copyright');
};
