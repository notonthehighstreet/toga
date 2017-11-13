const bundles = require(process.cwd() + '/dist/components/asset-bundles.json');

module.exports = (deps) => {
  const {
    'react-dom/server' : ReactDOMServer,
    '/views/component-raw': renderRawMarkup,
    '/views/component-test': renderTestMarkup,
    '/lib/component': Component,
    '/lib/components/require': requireComponent,
    debug
  } = deps;

  const log = debug('toga:RenderController');

  class RenderController {
    constructor(req, res, next) {
      log('RenderController:constructor');

      this.res = res;
      this.next = next;
      this.req = req;

      this.renderer = this.chooseRender(req);
      this.component = requireComponent(this.req.componentName);
    }

    chooseRender(req) {
      if(!req.raw && !req.preview) {
        return null;
      }

      return req.raw ? renderRawMarkup : renderTestMarkup;
    }

    renderComponentData({ url, props, websiteData }) {
      log('RenderController:renderComponentData');
      return this.component
        .then(({ component }) => new Component({ url, props, component: (component.default || component) }).create(websiteData))
        .then(({ component, initialState }) => ({ componentDOM: ReactDOMServer.renderToString(component), initialState }));
    }

    render(websiteData = null) {
      log('RenderController:render');
      const { url, props, componentName } = this.req;

      if (!this.renderer) {
        this.next();
        return Promise.resolve();
      }

      return this.renderComponentData({ url, websiteData, props })
        .then(({ componentDOM, initialState }) => ({ componentDOM, componentName, props, initialState }))
        .then((opts) => {
          const html = this.renderer({ ...opts, bundles });
          this.res.set('Content-Type', 'text/html');
          this.res.send(html);
        })
        .catch((err) => this.next(err));
    }
  }

  return RenderController;
};
