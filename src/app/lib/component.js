module.exports = (deps) => {
  const {
    'react' : React,
    '/lib/components/markup': Markup,
    '/lib/components/route': RouteOperations,
    debug
  } = deps;

  const log = debug('toga:Component');

  class Component {
    constructor({ component, props, url }) {
      this.props = props;
      this.url = url;
      this.component = component;

      this.store = component.store,
      this.routes = component.routes;
    }

    createWithoutStore() {
      return Promise.resolve({ component: React.createElement(this.component, this.props) })
        .catch((err) => {
          throw Error(err);
        });
    }

    createWithData(websiteData) {
      const routesArray = this.routes.getRoutesConfig();

      if(websiteData) {
        return RouteOperations.setData(routesArray, this.store.dispatch, websiteData);
      }
      return RouteOperations.getData(routesArray, this.url, this.store.dispatch, this.props);
    }

    create(websiteData = null) {
      log('Component:create');

      if(!this.store) {
        return this.createWithoutStore();
      }

      return this.createWithData(websiteData)
      .then(() => {
        return ({
          initialState: this.store.getState(),
          component: Markup({ url: this.url, store: this.store, context: {}, makeRoutes: this.routes.makeRoutes })
        });
      });
    }
  }

  return Component;
};
