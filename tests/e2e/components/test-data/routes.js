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

export function makeRoutes(props) {
  return (
    <div>
      <Switch>
        {getRoutesConfig().map((route) => (
          <Route {...route}
                 key={route.name}
                 render={() => <route.Component initialState={ props }/> }
          />
        ))}
      </Switch>
    </div>
  );
}
