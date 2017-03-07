module.exports = ({entities: {encodeHTML: encode}}) => {
  return function componentRaw({componentDOM, componentName, props, initialState}) {
    return `<div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        ${componentDOM}
    </div>`;
  };
};
