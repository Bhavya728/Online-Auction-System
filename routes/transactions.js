const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactions');
router.post('/', ctrl.addTransaction);
router.get('/by-buyer-auction', ctrl.getTransactionByBuyerAuction);
module.exports = router;