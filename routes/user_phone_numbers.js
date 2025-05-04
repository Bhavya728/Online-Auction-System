const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_phone_numbers');

router.post('/add', controller.addPhoneNumber);
router.get('/:userId', controller.getPhoneNumbersByUser);

module.exports = router;
