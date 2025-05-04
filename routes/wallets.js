const express = require('express');
const router = express.Router();
const controller = require('../controllers/wallets');

router.post('/create', controller.createWallet);
router.get('/:id', controller.getWallet);

module.exports = router;
