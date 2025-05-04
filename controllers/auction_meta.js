const { getConnection } = require('../database/db');
const AuctionMeta = require('../models/auction_meta');

exports.createAuctionMeta = async (req, res) => {
  const { itemId, startTimestamp, endTimestamp, startPrice, auctionType} = req.body;
  
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO auction_meta (itemId, startTimestamp, endTimestamp, startPrice, auctionType)
       VALUES (:itemId, TO_TIMESTAMP(:startTimestamp, 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP(:endTimestamp, 'YYYY-MM-DD HH24:MI:SS'), :startPrice, :auctionType)`,
      { itemId, startTimestamp, endTimestamp, startPrice, auctionType },
      { autoCommit: true }
    );
    
    res.send('Auction meta added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding auction meta');
  }
};