const express = require('express');
const htmlController = require('../../controllers/html');
const stylesController = require('../../controllers/styles');
const jsController = require('../../controllers/js');
const jsonController = require('../../controllers/json');
const setScopeId = require('../../middleware/setScopeId');
const setComponentPath = require('../../middleware/setComponentPath');
const setLocale = require('../../middleware/setLocale');
const router = express.Router();

router.use(
  setLocale,
  setComponentPath,
  setScopeId
);
router.get(/.*raw\.html$/,
  htmlController.raw
);
router.get(/.*\.html$/,
  htmlController.bundle
);
router.get(/.*\.css$/,
  stylesController.scss
);
router.get(/.*\.js$/,
  jsController.bundle
);
router.get(/.*\.json$/,
  jsonController.manifest
);

module.exports = router;
