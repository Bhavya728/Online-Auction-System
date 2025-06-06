const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/register', userController.registerUser);
// router.get('/:id', userController.getUser);
router.get('/getUserId', userController.getUserIdByNameAndEmail);


module.exports = router;
