const express = require('express');
const router = express.Router();
const controller = require('../controllers/item_images');

router.post('/add', controller.addImage);
router.get('/:itemId', controller.getImages);


module.exports = router;
