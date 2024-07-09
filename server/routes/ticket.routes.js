const express = require('express');
const router = express.Router();
const ticket = require('../controllers/ticket.controller');

router.post('/tickets', ticket.createTicket);
router.put('/tickets/:id', ticket.updateTicket);
router.delete('/tickets/:id', ticket.deleteTicket);

module.exports = router;