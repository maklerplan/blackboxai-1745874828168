const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// POST /api/leads/import - Import lead JSON from Dialfire
router.post('/import', leadController.importLead);

module.exports = router;
