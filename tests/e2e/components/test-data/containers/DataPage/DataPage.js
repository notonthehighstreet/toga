import React from 'react';
import { connect } from 'react-redux';

import Data from '../../components/Data/Data';
import { fetchSwapiData } from '../../actions';

const Error = ({ error }) => <div>
  <p>Error Loading !</p>
  <p>{ error.message }</p>
</div>;

const Loading = () => <p className="loading">Loading ....</p>;

class App extends React.Component {

  static needs = [fetchSwapiData];

  static propTypes = {
    data: React.PropTypes.object
  };

  static defaultProps = {
    data: { }
  };

  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    this.props.fetchSwapiData();
  }

  render() {
    const { errors = [], loading, data = {} } = this.props;

    return (
      <div id="data">
        <banner className="header">
          <h1>SSR Data Test</h1>
          <p>
            Collecting data on the server + the client.
          </p>
        </banner>
        <button onClick={() => this.fetch()}>Fetch more data</button>
        {errors.map((error, i) => <Error key={`error-${i}`} error={error} />)}
        {loading && <Loading /> }
        {!loading && <Data data={ data } /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.data.errors,
    loading: state.data.loading,
    data: state.data.swapi,
  };
}

export default connect(
  mapStateToProps,
  { fetchSwapiData }
)(App);
