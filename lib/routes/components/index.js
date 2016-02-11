const express = require('express');
const htmlController = require('../../controllers/html');
const stylesController = require('../../controllers/styles');
const jsController = require('../../controllers/js');
const jsonController = require('../../controllers/json');
const setMountNodeId = require('../../middleware/setMountNodeId');
const setComponentPath = require('../../middleware/setComponentPath');
const setLocale = require('../../middleware/setLocale');
const setComponentsContext = require('../../middleware/setComponentsContext');
const router = express.Router();

router.use(
  setLocale,
  setComponentPath,
  setMountNodeId
);
router.get(/.*\.raw\.html$/,
  setComponentsContext({paramName: 'context'}),
  htmlController.raw
);
router.get(/.*\.html$/,
  setComponentsContext({paramName: 'context'}),
  htmlController.test
);
router.get(/^\/toga.css$/,
  stylesController.toga
);
router.get(/^\/styles.css$/,
  setComponentsContext({paramName: 'components'}),
  stylesController.scss
);
router.get(/^\/components-vendor-bundle\.js$/,
  jsController.vendorBundle
);
router.get(/^\/components\.js$/,
  setComponentsContext({paramName: 'components'}),
  jsController.bundle
);
router.get(/.*\.json$/,
  jsonController.manifest
);

module.exports = router;
