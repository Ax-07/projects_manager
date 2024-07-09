const express = require('express');
const router = express.Router();
const projet = require('../controllers/projet.controller');

router.post('/projet', projet.createProjet);
router.get('/projet', projet.getAllProjet);
router.get('/projet/:id', projet.getProjetById);
router.put('/projet/:id', projet.updateProjet);
router.delete('/projet/:id', projet.deleteProjet);

module.exports = router;
