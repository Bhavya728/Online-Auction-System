const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/register', userController.registerUser);
router.get('/:id', userController.getUser);

module.exports = router;
