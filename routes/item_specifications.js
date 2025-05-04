const express = require('express');
const router = express.Router();
const controller = require('../controllers/item_specifications');

router.post('/add', controller.addSpecification);
router.get('/:itemId', controller.getSpecifications);

module.exports = router;
