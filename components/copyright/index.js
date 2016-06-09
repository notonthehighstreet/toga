import React from 'react';
import toga from 'toga-component';
import i18n from './i18n.json';

class Copyright extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'BOOM': false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
  }
  onMouseOver(boom) {
    this.setState({
      'BOOM': boom
    });
  }
  render() {
    const { locale, one } = this.props;
    const { BOOM } = this.state;
    const phrases = i18n[locale];
    const t = toga.createT({phrases});
    return (
      <div
        className={`copyright-text${BOOM ? ' highlighted' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
      >
        &copy; 2016 - {t('THANKS')} {one}
      </div>
    );
  }
}

module.exports = toga.wrapComponent(Copyright, 'copyright');
