import React, { Children } from 'react';
import uuid from 'node-uuid';

export default function passPropsToComponent(component, matchers) {
  let props = component.props;
  let children = component.props && component.props.children;
  const matchFound = matchers.find((matcher) => component.type === matcher.Component);

  if (matchFound) {
    props = matchFound.props;
  }
  else if (children) {
    props = { ...props, key: uuid.v4() };
    children = Children.map(children, (child) => passPropsToComponent(child, matchers) );
  }
  return React.cloneElement(component, props, children);
}
