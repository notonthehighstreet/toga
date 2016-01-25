const React = require('react');
const Copyright = React.createClass({
  render() { //TODO include the `t` function more like in a React way plx
    return (
      <div
        className={`copyright ${this.state.BOOM ? 'boom' : ''}`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        &copy; 2016 - {this.props.t('THANKS')}
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

module.exports = Copyright;
