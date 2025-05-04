const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/shipping');
router.post('/', ctrl.addShipping);
module.exports = router;