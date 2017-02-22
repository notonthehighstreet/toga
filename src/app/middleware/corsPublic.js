module.exports = (deps) => {
  const {
    'cors': cors
  } = deps;

  // Permits a request from any origin. Only for use with public assets
  const corsOptionsDelegate = (req, callback) => callback(null, { origin: true });

  return cors(corsOptionsDelegate);
};
