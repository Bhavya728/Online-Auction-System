const { getConnection } = require('../database/db');
const Transaction = require('../models/transactions');

exports.addTransaction = async (req, res) => {
  const {  buyerId, auctionId, amount, transactionFee, currency } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(`INSERT INTO transactions (buyerId,auctionId,amount,transactionTimestamp,transactionFee,currency)
       VALUES ( :buyerId, :auctionId, :amount,SYSTIMESTAMP , :transactionFee, :currency)`,
      { buyerId, auctionId, amount,  transactionFee, currency }, { autoCommit: true });
    res.send('Transaction added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error recording transaction');
  }
};
exports.getTransactionByBuyerAuction = async (req, res) => {
  const { buyerId, auctionId } = req.query;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT id FROM transactions 
       WHERE buyerId = :buyerId AND auctionId = :auctionId
       ORDER BY transactionTimestamp DESC FETCH FIRST 1 ROWS ONLY`,
      { buyerId, auctionId }
    );
    
    if (result.rows.length === 0) {
      return res.status(404).send('No transaction found');
    }
    
    res.json({ id: result.rows[0][0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error finding transaction');
  }
};