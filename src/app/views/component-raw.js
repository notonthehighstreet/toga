module.exports = ({entities: {encodeHTML: encode}}) => {
  return function componentRaw({componentDOM, componentName, props}) {
    return `<div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>
        ${componentDOM}
    </div>`;
  };
};
