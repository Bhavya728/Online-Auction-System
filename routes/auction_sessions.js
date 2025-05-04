const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auction_sessions');
router.post('/', ctrl.createAuctionSession);
module.exports = router;