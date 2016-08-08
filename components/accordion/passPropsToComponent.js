import React, { Children } from 'react';

const updateChildren = (component, matchFound, matchers) => {
  const children = component.props && component.props.children;
  return (!matchFound && children)
    ? Children.map(children, (child) => passPropsToComponent(child, matchers) )
    : children;
};

export default function passPropsToComponent(component, matchers) {
  const matchFound = matchers.find((matcher) => component.type === matcher.Component);
  const newProps = matchFound ? matchFound.props : component.props;
  const newChildren = updateChildren(component, matchFound, matchers);
  return React.cloneElement(component, newProps, newChildren);
}
