import React from 'react';
import i18n from './i18n.json';

import './styles.scss';

module.exports = class Copyright extends React.Component {
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
    const t = (key) => i18n[locale] && i18n[locale][key] || key;
    return (
      <div
        className={`toga-copyright${BOOM ? ' highlighted' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
      >
        &copy; 2016 - {t('THANKS')} {one}
      </div>
    );
  }
};

