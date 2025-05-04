const { getConnection } = require('../database/db');
const WalletTransaction = require('../models/wallet_transactions');

exports.addTransaction = async (req, res) => {
  const { walletId, amount, type } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO wallet_transactions ( walletId, amount, transactionTimestamp, type)
       VALUES ( :walletId, :amount, SYSTIMESTAMP, :type)`,
      { walletId, amount, type },
      { autoCommit: true }
    );
    res.send('Transaction recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add transaction');
  }
};

exports.getTransactionsByWallet = async (req, res) => {
  const { walletId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM wallet_transactions WHERE walletId = :walletId ORDER BY timestamp DESC`,
      [walletId]
    );
    const txs = result.rows.map(row => new WalletTransaction(row));
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching transactions');
  }
};
