import React from 'react';

import './styles.scss';

module.exports = class TestMultiple extends React.Component {
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
        className={`toga-test-multiple${BOOM ? ' highlighted' : ''}${clicked ? ' clicked' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
        onClick={() => this.onClick()}
      >
        Test Component: 
        <div id="test2-locale">locale : {locale}</div>
        <div id="test2-context">context (one) : {one}</div>
        <div id="test2-clicked">clicked : {clicked.toString()}</div>
        <div id="test2-highlighted">highlighted : {BOOM.toString()}</div>
      </div>
    );
  }
};

