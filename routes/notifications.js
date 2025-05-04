const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifications');

router.post('/send', controller.sendNotification);
router.get('/:userId', controller.getNotificationsByUser);

module.exports = router;
