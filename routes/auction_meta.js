const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auction_meta');
router.post('/', ctrl.createAuctionMeta);
module.exports = router;