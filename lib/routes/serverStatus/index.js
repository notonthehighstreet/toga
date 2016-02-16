const express = require('express');
const serverStatusController = require('../../controllers/serverStatus');
const router = express.Router();

router.get('/health', serverStatusController.health);

module.exports = router;
