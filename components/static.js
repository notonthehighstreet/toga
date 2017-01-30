import React from 'react';
import ReactDomServer from 'react-dom/server';

import HelloWorld from './HelloWorld';

import templateBB from '../src/app/views/component-raw';
import entities from 'entities';
const template = templateBB({ entities });

export const staticComponents = { HelloWorld };

function render(componentName, locals) {
  const Component = staticComponents[componentName];
  return ReactDomServer.renderToString(
    React.createElement(Component.default || Component, locals)
  );
}

export default (locals, callback) => {
  const componentName = locals.path.split('-')[0];
  const componentDOM = render(componentName);
  callback(null, template({ componentDOM, componentName, props: {} }));
};
