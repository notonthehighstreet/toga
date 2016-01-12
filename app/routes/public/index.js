const express = require('express');
const router = express.Router();

router.use(express.static('public'));

module.exports = router;
