const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/item_auctions');
router.post('/', ctrl.linkItemAuction);
module.exports = router;