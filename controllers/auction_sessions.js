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
exports.getAuctionId = async (req, res) => {
  const { itemId } = req.query;

  if (!itemId) {
    return res.status(400).send('itemId is required');
  }

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT id FROM auction_sessions WHERE ITEMID = :itemId`,
      { itemId }
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Auction not found');
    }

    const auctionId = result.rows[0][0]; // Assuming 'id' is the first column
    res.json({ auctionId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch auction ID');
  }
};



