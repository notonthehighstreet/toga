import React from 'react';
import ReactDomServer from 'react-dom/server';

import HelloWorld from './HelloWorld';
import HelloWorld2 from './HelloWorld2';

import templateBB from '../src/app/views/component-raw';
import entities from 'entities';
const template = templateBB({ entities });

export const components = { HelloWorld, HelloWorld2 };

function render(componentName, locals) {
  const Component = components[componentName];
  return ReactDomServer.renderToString(
    React.createElement(Component.default || Component, locals)
  );
}

export default (locals, callback) => {
  const componentName = locals.path;
  const componentDOM = render(componentName);
  callback(null, template({ componentDOM, componentName, props: {} }));
};
