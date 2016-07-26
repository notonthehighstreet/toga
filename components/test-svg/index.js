import React from 'react';
import Svg from '../svg';

import chevron from './assets/chevron.svg';
import './styles.scss';

module.exports = class TestOne extends React.Component {
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
        className={`toga-test-one${BOOM ? ' highlighted' : ''}${clicked ? ' clicked' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
        onClick={() => this.onClick()}
      >
        <div>
          <h2>Example: One Component</h2>
          <p>This example is used to test a HTML page containing a single component</p>
        </div>
        <div id="test-locale">locale : {locale}</div>
        <div id="test-context">context (one) : {one}</div>
        <div id="test-clicked">clicked : {clicked.toString()}</div>
        <div id="test-highlighted">highlighted : {BOOM.toString()}</div>
        <div id="test-svg"><Svg markup={ chevron }/></div>
      </div>
    );
  }
};

