module.exports = (deps) => {
  return function getRawComponentHtml(req, res) {
    const {
      '/lib/renderComponent': renderComponent,
      '/views/component-test': renderTestMarkup,
      '/views/component-raw': renderRawMarkup
    } = deps;
    const { componentContext, locale, path, componentPath } = req;
    const isRaw = path.endsWith('.raw.html');
    const componentName = componentPath.slice(1);
    const context = { locale, ...componentContext };
    const renderer = isRaw ? renderRawMarkup : renderTestMarkup;
    const html = renderComponent({componentName, context}, renderer);

    res.set('Content-Type', 'text/html').send(html);
  };
};
