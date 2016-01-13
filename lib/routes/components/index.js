const express = require('express');
const htmlController = require('../../controllers/html');
const stylesController = require('../../controllers/styles');
const setScopeId = require('../../middleware/setScopeId');
const router = express.Router();

router.get(/.*raw\.html$/, htmlController.raw);
router.get(/.*\.html$/,
  setScopeId,
  htmlController.bundle
);
router.get(/.*\.css$/,
  setScopeId,
  stylesController.scss
);

module.exports = router;
