module.exports = ({componentDOM, componentPath, context}) => {
  return `
    <div toga="${componentPath}" prop='${JSON.stringify(context)}' class="toga-${componentPath} toga-component">
      ${componentDOM}
    </div>
    `;
};
