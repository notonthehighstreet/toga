import React from 'react';

// Find children which match the component and pass it the props
// if no child matches, then it will search for grandchildren
// if no grandchild matches it gives up and returns the original node
export default function passPropsToComponent(child, matchers) {
  let match = matchers.reduce((prev, matcher) => {
    return (child.type === matcher.Component)
      ? React.cloneElement(child, matcher.props)
      : prev;
  }, child);

  if (match === child && child.props) {
    const grandchildMatch = child.props.children
      && [].concat(child.props.children).map((grandchild) => passPropsToComponent(grandchild, matchers));
    match = React.cloneElement(child, child.props, grandchildMatch);
  }
  return match;
}
