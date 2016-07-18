import React from 'react';
import bemHelper from 'react-bem-helper';

import Button from '../button';
import LinksList from '../links-list';
import links from './links';

import './styles.scss';

const bem = bemHelper({ prefix: 'toga-', name: 'my-account' });

const LoggedOutContent = () =>
  <div { ...bem() }>
    <Button href="/user#login" size="medium" fullWidth >sign in</Button>
    <Button href="/user/new" size="medium" fullWidth >register</Button>
  </div>;

const LoggedInContent = () =>
  <div { ...bem() }>
    <LinksList links={links.myAccount} />
    <Button type="secondary" size="medium">sign out</Button>
  </div>;

export default ({loggedIn}) => loggedIn ? <LoggedInContent /> : <LoggedOutContent />;
