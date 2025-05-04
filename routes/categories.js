const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories');

router.post('/create', controller.createCategory);
router.get('/all', controller.getAllCategories);

module.exports = router;
