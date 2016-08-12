module.exports = () => {
  return function componentRaw({componentDOM, componentName, props}) {
    return `
      <div toga="${componentName}" props='${JSON.stringify(props)}'>${componentDOM}</div>
      `;
  };
};
