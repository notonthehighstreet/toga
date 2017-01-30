import React from 'react';
import ReactDomServer from 'react-dom/server';

import templateBB from '../../app/views/component-raw';
import entities from 'entities';
const template = templateBB({ entities });

function render(componentName, locals) {
  const Component = locals[componentName];
  return ReactDomServer.renderToString(
    React.createElement(Component.default || Component, locals)
  );
}

export default (locals) => {
  const dashes = locals.path.split('-');
  dashes.pop();
  const componentName = dashes.join('-');
  const componentDOM = render(componentName, locals);
  return Promise.resolve(template({ componentDOM, componentName, props: {} }));
};
