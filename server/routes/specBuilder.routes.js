const express = require('express');
const router = express.Router();

const specBuilder = require('../controllers/specBuilder.controller');

router.post('/specification', specBuilder.createSpec);
router.get('/specification', specBuilder.getAllSpec);
router.get('/specification/:id', specBuilder.getSpecById);
router.put('/specification/:id', specBuilder.updateSpec);
router.delete('/specification/:id', specBuilder.deleteSpec);

router.get('/specification/:id/features', specBuilder.getFeaturesFromSpecById);

module.exports = router;