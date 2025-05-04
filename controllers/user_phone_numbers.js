const { getConnection } = require('../database/db');
const UserPhoneNumber = require('../models/user_phone_numbers');

exports.addPhoneNumber = async (req, res) => {
  const { userId, phoneNumber } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO user_phone_numbers (userId, phoneNumber) VALUES (:userId, :phoneNumber)`,
      { userId, phoneNumber },
      { autoCommit: true }
    );
    res.send('Phone number added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add phone number');
  }
};

exports.getPhoneNumbersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM user_phone_numbers WHERE userId = :userId`,
      [userId]
    );
    const phones = result.rows.map(row => new UserPhoneNumber(row));
    res.json(phones);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve phone numbers');
  }
};

