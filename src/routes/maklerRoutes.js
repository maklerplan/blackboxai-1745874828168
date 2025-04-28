const express = require('express');
const router = express.Router();
const maklerController = require('../controllers/maklerController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Protect all makler routes with authentication middleware
router.use(authenticateJWT);

// CRUD endpoints for Makler
router.get('/', maklerController.getAllMakler);
router.get('/:id', maklerController.getMaklerById);
router.post('/', maklerController.createMakler);
router.put('/:id', maklerController.updateMakler);
router.delete('/:id', maklerController.deleteMakler);

module.exports = router;
