import React from 'react';
import BEMHelper from 'react-bem-helper';

import Count from './count';
import Counter from './counter';

import './styles.scss';

const bem = new BEMHelper({  prefix: 'test-', name: 'communication' });

module.exports = class Comms extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.updateCount = this.updateCount.bind(this);
  }

  updateCount(addition) {
    this.setState({
      count: this.state.count + addition
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div { ...bem(null) }>
        <div>
          <h2>Example: Communicating Components</h2>
          <p>This example demonstrates how to have 2 components (`Count` and `Counter`) affect each other.</p>
          <p>The key is to have a third component (test-communication) control the `onClick` event and the state.
            The event and state is then passed to the relevant component.</p>
        </div>
        <div>
          <Count className="left" count={ count } />
          <Counter className="right" onClick={ ()=> this.updateCount(1) }>+1</Counter>
          <Counter className="right" onClick={ ()=> this.updateCount(-1) }>-1</Counter>
        </div>
      </div>
    );
  }
};
