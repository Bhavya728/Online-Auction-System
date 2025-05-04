const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bids');
router.post('/', ctrl.placeBid);
module.exports = router;
