const { getConnection } = require('../database/db');
const Bid = require('../models/bids');

exports.placeBid = async (req, res) => {
  const {  userId, auctionId, amount } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(`INSERT INTO bids (userId,auctionId,amount,bidTimestamp) VALUES ( :userId, :auctionId, :amount, SYSTIMESTAMP)`,
      {  userId, auctionId, amount }, { autoCommit: true });
    res.send('Bid placed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error placing bid');
  }
};