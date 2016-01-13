const express = require('express');
const htmlController = require('../../controllers/html');
const stylesController = require('../../controllers/styles');
const router = express.Router();

router.get(/.*raw\.html$/, htmlController.raw);
router.get(/.*\.html$/, htmlController.bundle);
router.get(/.*\.css$/, stylesController.scss);

module.exports = router;
