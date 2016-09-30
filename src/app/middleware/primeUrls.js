const componentsPrimed = {};
module.exports = (deps) => {
  const {
    '/lib/getComponentInfo': getComponentInfo,
    '/config/index': getConfig,
    axios
  } = deps;

  return function primeUrls(req, res) {
    const config = getConfig();
    const components = getComponentInfo()
      .map(componentInfo => componentInfo.name )
      .filter((component) => component !== config.vendor.componentName)
      .filter((component) => !componentsPrimed[component]);

    const primeUrl = (componentName) => {
      componentsPrimed[componentName] = true;
      return axios.get(`/v${config.apiVersion}/${componentName}.raw.html`, {
        baseURL: `http://${config.server.host}:${config.server.port}`
      });
    };
    return axios
      .all(components.map(primeUrl))
      .then(()=>{
        res.json({
          'status': 'HEALTHY',
          'new-components-primed': components.length
        });
      });
  };
};
