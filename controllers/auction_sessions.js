const { getConnection } = require('../database/db');
const AuctionSession = require('../models/auction_sessions');

exports.createAuctionSession = async (req, res) => {
  const {  itemId, bidCount } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(`INSERT INTO auction_sessions (itemId, bidCount) VALUES (:itemId, :bidCount)`,
      {  itemId, bidCount }, { autoCommit: true });
    res.send('Auction session created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating session');
  }
};