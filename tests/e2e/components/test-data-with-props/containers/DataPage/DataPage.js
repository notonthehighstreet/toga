import React from 'react';
import { connect } from 'react-redux';
import Data from '../../components/Data/Data';
import { fetchSwapiData } from '../../actions';

class App extends React.Component {

  static needs = [fetchSwapiData];

  static propTypes = {
    data: React.PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="data">
        <banner className="header">
          <h1>SSR Data Test</h1>
          <p>
            Collecting data on the server based on the initial state.
          </p>
        </banner>
        <Data {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.data.name,
    list: state.data.list,
  };
}

export default connect(
  mapStateToProps,
  { fetchSwapiData }
)(App);
