import React from 'react';

import './styles.scss';

module.exports = class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'BOOM': false,
      clicked: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onMouseOver(boom) {
    this.setState({
      'BOOM': boom
    });
  }
  onClick() {
    this.setState({
      clicked: true
    });
  }
  render() {
    const { locale, one } = this.props;
    const { BOOM, clicked } = this.state;
    return (
      <div
        className={`toga-test${BOOM ? ' highlighted' : ''}${clicked ? ' clicked' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
        onClick={() => this.onClick()}
      >
        Test Component: 
        <div id="locale">locale : {locale}</div>
        <div id="context">context (one) : {one}</div>
        <div id="clicked">clicked : {clicked.toString()}</div>
        <div id="highlighted">highlighted : {BOOM.toString()}</div>
      </div>
    );
  }
};

