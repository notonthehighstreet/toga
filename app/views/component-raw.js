module.exports = () => {
  return function componentRaw({componentDOM, componentName, context}) {
    return `
      <div toga="${componentName}" props='${JSON.stringify(context)}'>${componentDOM}</div>
      `;
  };
};
