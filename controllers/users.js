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


// exports.getUser = async (req, res) => {
//   const id = Number(req.params.id);
// if (isNaN(id)) {
//   return res.status(400).send('Invalid user ID');
// }

//   try {
//     const conn = await getConnection();
//     const result = await conn.execute(`SELECT * FROM users WHERE id = :id`, [id]);
//     if (result.rows.length === 0) return res.status(404).send('User not found');
//     const user = new User(result.rows[0]);
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching user');
//   }
exports.getUserIdByNameAndEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send('Name and Email are required');
  }

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT id FROM users WHERE email = :email`,
      {  email }
    );

    // Corrected console.log
    console.log(email); 
    console.log(result); // This will now log the correct variable

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    const userId = result.rows[0][0]; // Assuming id is the first column
    res.json({ userId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch user ID');
  }
};


