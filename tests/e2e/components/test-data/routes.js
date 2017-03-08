import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import DataPage from './containers/DataPage/DataPage';

export function getRoutesConfig() {
  return [
    {
      name: 'DataPage',
      path: '/',
      Component: DataPage
    }
  ];
}

const renderRouteWithComponent = ((route) => (
  <Route {...route}
         key={route.name}
         render={(matchProps) => (
            <route.Component {...matchProps}/>
          )
         }
  />
));

export function makeRoutes() {
  return (
    <div>
      <Switch>
        {getRoutesConfig().map(renderRouteWithComponent)}
      </Switch>
    </div>
  );
}
