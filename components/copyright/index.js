const React = require('react');

module.exports = ({locale} = {locale: 'en'}) => {
  const phrases = require('./i18n.json')[locale];
  const t = require('toga-component').createT({phrases});

  return React.createClass({
    render() {
      return (
        <div
          className={`toga-copyright${this.state.BOOM ? ' boom' : ''}`}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          &copy; 2016 - {t('THANKS')}
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
};
