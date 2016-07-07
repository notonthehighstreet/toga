import React from 'react';
import FooterLinks from './FooterLinks';

const loggedInLinks = [ {href:'/user', name:'my details'},
  {href:'https://www.notonthehighstreet.com/user/orders', name:'my orders'},
  {href:'https://www.notonthehighstreet.com/calendar/events', name:'my calendar'},
  { href:'https://www.notonthehighstreet.com/user/wish-list', name:'my wish list'},
  { href:'https://www.notonthehighstreet.com/user/account', name: 'my funds'},
  { href:'/user/communication-preferences', name: 'my communication preferences'}];

module.exports = ({loggedIn}) =>
<div>
  { loggedIn ? <LoggedInContent /> : <LoggedOutContent />}
</div>;

const LoggedOutContent = () =>
<div className="logged-out-content">
    <button href="/user#login" className="n-button n-button--primary n-button--medium n-button--full-width logged-out-content__button--sign-in" type="submit">sign in</button>
    <button href="/user/new"className="n-button n-button--primary n-button--medium n-button--full-width" type="submit">register</button>
</div>;

const LoggedInContent = () =>
<div className="myaccount-content">
  <FooterLinks links={loggedInLinks} />
  <div className="myaccount-content__signout">
    <button className="n-button n-button--secondary n-button--medium">Sign out</button>
  </div>
</div>;
