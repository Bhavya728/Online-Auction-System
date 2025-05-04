const { getConnection } = require('../database/db');
const Notification = require('../models/notifications');

exports.sendNotification = async (req, res) => {
  const {  userId, message,isRead } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO notifications ( userId, message, notificationTimestamp, isRead)
       VALUES ( :userId, :message, SYSTIMESTAMP, :isRead)`,
      {  userId, message,isRead },
      { autoCommit: true }
    );
    res.send('Notification sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send notification');
  }
};

exports.getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM notifications WHERE userId = :userId ORDER BY timestamp DESC`,
      [userId]
    );
    const notifications = result.rows.map(row => new Notification(row));
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching notifications');
  }
};
