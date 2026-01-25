const express = require('express');
const { getCodingStats, updateCodingStats } = require('../controllers/codingStatsController');

const router = express.Router();

router.get('/', getCodingStats);
router.put('/:platform', updateCodingStats);

module.exports = router;