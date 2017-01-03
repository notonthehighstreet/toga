import React from 'react';
import bemHelper from 'react-bem-helper';

import './styles.scss';

const bem = bemHelper({name: 'hello-toga'});

export default class HelloWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statusChecked: false
    };
    this.checkServerStatus = this.checkServerStatus.bind(this);
  }

  checkServerStatus() {
    this.setState({statusChecked: true});
  }

  render() {
    const {world} = this.props;
    const {statusChecked} = this.state;
    return (
      <div { ...bem() }>

        <h1>Welcome to Toga</h1>
        <p>Hello {world} World! Toga is successfully running.</p>
        <p>
          You can check here if you don't believe me:
           <a href="/health" target="_blank" onClick={ this.checkServerStatus }>/health</a>, then
          come back.
        </p>
        <p { ...bem('status-checked', null, {hidden: !statusChecked})}>
          <em><strong>told you so!</strong></em>
        </p>

        <h2>Why am I here?</h2>
        <p>Glad you asked: This is a `HelloWorld` component, written in React, being served by Toga.</p>
        <p>Oh, you mean important things?
          well, i reckon go an poke about in
          <a href="https://github.com/notonthehighstreet/toga/tree/master/example" target="_blank"><code>/example</code></a>
        </p>
        <p>If you have any ideas for improvements or spot any bugs, please let us know:</p>
        <p><a href="https://github.com/notonthehighstreet/toga/issues" target="_blank"><code>github.com/notonthehighstreet/toga/issues</code></a></p>

        <strong>Have fun!</strong>
      </div>
    );
  }
}
