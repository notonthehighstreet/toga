const express = require('express');
const marathonController = require('../../controllers/marathon');
const router = express.Router();

router.get('/health', marathonController.health);

module.exports = router;
