function isEmptySpan(component) {
  return (component.props.children.type === 'span' && Object.keys(component.props.children.props).length === 0);
}

export default function getComponent(children, type, hasChildren = true) {
  const arr = Array.isArray(children) ? children : [children];
  const component = arr.filter((child) => {
    return child && child.type === type;
  })[0];

  let hasValidContent;

  if (hasChildren) {
    hasValidContent = component && component.props && component.props.children && !isEmptySpan(component);
  }
  else {
    hasValidContent = component && component.props;
  }

  return (hasValidContent) && component;
}
