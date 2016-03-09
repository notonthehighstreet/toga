module.exports = () => {
  return function componentRaw({componentDOM, componentName, context}) {
    return `
      <div toga="${componentName}" prop='${JSON.stringify(context)}' class="toga-${componentName} toga-component">${componentDOM}</div>
      `;
  };
};
