import React from 'react';
import Test from '../test-one';

import './styles.scss';

module.exports = class TestNested extends React.Component {
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
        className={`toga-test-nested${BOOM ? ' highlighted' : ''}${clicked ? ' clicked' : ''}`}
        onMouseOver={() => this.onMouseOver(true)}
        onMouseOut={() => this.onMouseOver(false)}
        onClick={() => this.onClick()}
      >
        Test Nested Components:
        <div id="test-nested-locale">locale : {locale}</div>
        <div id="test-nested-context">context (one) : {one}</div>
        <div id="test-nested-clicked">clicked : {clicked.toString()}</div>
        <div id="test-nested-highlighted">highlighted : {BOOM.toString()}</div>

         This is nested '&lt;Test />':
        <div style={{ padding: '15px', background: 'grey'}}>
          <Test />
        </div>
      </div>
    );
  }
};

