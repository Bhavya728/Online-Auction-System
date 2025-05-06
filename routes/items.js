const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

router.post('/create', controller.createItem);
router.get('/:id', controller.getItem);
router.get('/name/:name', controller.getItemByName);


module.exports = router;
