const React = require('react');
const togaComponent = require('toga-component');
const i18n = require('./i18n.json');

module.exports = React.createClass({
  render() {
    const { locale } = this.props;
    const phrases = i18n[locale];
    const t = togaComponent.createT({phrases});
    return (
      <div
        className={`test-text${this.state.BOOM ? ' highlighted' : ''}`}
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
