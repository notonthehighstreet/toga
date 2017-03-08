import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Swapi from './containers/Swapi/Swapi';

export function getRoutesConfig() {
  return [
    {
      name: 'swapi',
      path: '/',
      Component: Swapi
    }
  ];
}

export function makeRoutes() {
  return (
    <div>
      <Switch>
        {getRoutesConfig().map((route) => <Route {...route} render={(matchProps) => (
          <route.Component {...matchProps}/>
        )}/>)}
      </Switch>
    </div>
  );
}
