import React from 'react';

import logo from './assets/logo.png';
import retinaLogo from './assets/logo@2x.png';
import retinaLogoSm from './assets/logo-sm@2x.png';
import logoSm from './assets/logo-sm.png';

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
        <picture>
          <source media="(max-width: 767px)" srcSet={`${logoSm}, ${retinaLogoSm} 2x`} />
          <img src={logo} srcSet={`${logo}, ${retinaLogo} 2x`} alt="not on the high street.com" />
        </picture>

        <div>
          <h2>Example: Multiple Components on the same page</h2>
          <p>This example is used to test a HTML page which contains 2 components.</p>
        </div>
        <div id="test2-locale">locale : {locale}</div>
        <div id="test2-props">props (one) : {one}</div>
        <div id="test2-clicked">clicked : {clicked.toString()}</div>
        <div id="test2-highlighted">highlighted : {BOOM.toString()}</div>
      </div>
    );
  }
};

