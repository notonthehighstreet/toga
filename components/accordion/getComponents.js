function childIsEmptySpan(component) {
  return component.props.children.type === 'span'
    && Object.keys(component.props.children.props).length === 0;
}

function hasChildren(component) {
  return component && component.props && component.props.children;
}

function filterComponentTypes(child, type) {
  const component = child.type === type ? child : null;
  return hasChildren(component) && !childIsEmptySpan(component);
}

export default function getComponents(children, type) {
  return [].concat(children).filter((child) => filterComponentTypes(child, type));
}
