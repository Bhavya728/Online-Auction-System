const express = require('express');
const router = express.Router();
const controller = require('../controllers/payments');

router.post('/make', controller.makePayment);
router.get('/:userId', controller.getPaymentsByUser);

module.exports = router;
