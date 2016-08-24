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
    const {statusChecked} = this.state;
    return (
      <div { ...bem() }>

        <h1>Welcome to Toga</h1>
        <p>Toga is successfully running!</p>
        <p>
          You can check here if you don't believe me:
          <a href="/health" target="_blank" onClick={ this.checkServerStatus }>/health</a>, then
          come back.
        </p>
        <p { ...bem('status-checked', null, {hidden: !statusChecked})}>
          <em><strong>told you so!</strong></em>
        </p>

        <h2>Why am I here?</h2>
        <p><strong>42</strong></p>
        <p>sorry, no, that's something else.</p>
        <p>You are here because you didn't pass in a components config when starting toga.
          It is likely that you need to stop the server and restart it like so:</p>
        <code>npm start -- --components=project-name</code>

        <h2>Wait! Before you do that...</h2>
        <p>I bet you haven't linked Toga to your project containing all your cool React
          components?</p>
        <p>You can link the 2 projects either using <code>npm link</code> or by <code>npm i</code>.
        </p>

        <h3>npm link</h3>
        <p>In your components project run <code>npm link</code>.</p>
        <p>Within toga you will now need to run <code>npm link components-project-name</code></p>

        <h3>Npm i</h3>
        <p>You can directly install the components project into Toga.
          However, we don't recommend this because if you ever want to update Toga from our repo you
          might get conflicts.
          Sheesh - who wants those!
        </p>

        <h2>Since I'm here, What else?</h2>
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

