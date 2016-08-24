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
    return (
      <div
        className={`test-text${this.state.BOOM ? ' highlighted' : ''}`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        &copy; 2016 
      </div>
    );
  }
};
