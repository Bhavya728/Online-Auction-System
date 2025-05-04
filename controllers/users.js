const { getConnection } = require('../database/db');
const User = require('../models/users');

exports.registerUser = async (req, res) => {
  const { fullName, email, passwordHash, address } = req.body;

  if (!fullName || !email || !passwordHash) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO users (fullName, email, passwordHash, address, accountStatus)
       VALUES (:fullName, :email, :passwordHash, :address, 1)`,
      { fullName, email, passwordHash, address },
      { autoCommit: true }
    );
    res.send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
};


exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM users WHERE id = :id`, [id]);
    if (result.rows.length === 0) return res.status(404).send('User not found');
    const user = new User(result.rows[0]);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user');
  }
};
