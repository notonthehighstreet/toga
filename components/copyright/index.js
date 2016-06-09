import React from 'react';
import { createT } from 'toga-component';
import i18n from './i18n.json';

module.exports = React.createClass({
  render() {
    const { locale } = this.props;
    const phrases = i18n[locale];
    const t = createT({phrases});
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
