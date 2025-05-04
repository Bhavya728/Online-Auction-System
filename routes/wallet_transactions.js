const express = require('express');
const router = express.Router();
const controller = require('../controllers/wallet_transactions');

router.post('/add', controller.addTransaction);
router.get('/:walletId', controller.getTransactionsByWallet);

module.exports = router;
