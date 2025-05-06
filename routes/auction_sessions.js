const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auction_sessions');
router.post('/', ctrl.createAuctionSession);
router.get('/fetchId', ctrl.getAuctionId);

module.exports = router;




