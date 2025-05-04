const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviews');

router.post('/add', controller.addReview);
router.get('/item/:itemId', controller.getReviewsForItem);

module.exports = router;
