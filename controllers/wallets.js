const { getConnection } = require('../database/db');
const Wallet = require('../models/wallets');

exports.createWallet = async (req, res) => {
  const { userId, balance, currency } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO wallets ( userId, balance, lastUpdated, currency, freezeStatus)
       VALUES ( :userId, :balance, SYSTIMESTAMP, :currency, 0)`,
      { userId, balance, currency },
      { autoCommit: true }
    );
    res.send('Wallet created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create wallet');
  }
};

exports.getWallet = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM wallets WHERE id = :id`, [id]);
    if (result.rows.length === 0) return res.status(404).send('Wallet not found');
    const wallet = new Wallet(result.rows[0]);
    res.json(wallet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching wallet');
  }
};
