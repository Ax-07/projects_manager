const express = require('express');
const router = express.Router();
const backlog = require('../controllers/backlog.controller');

router.post('/specification/:id/backlog', backlog.createBacklog);
router.get('/specification/:id/backlog', backlog.getBacklogBySpecificationId);
router.get('/specification/:id/backlog/:id', backlog.getBacklogById);

module.exports = router;