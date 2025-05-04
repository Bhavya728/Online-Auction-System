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