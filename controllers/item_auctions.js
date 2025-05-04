const { getConnection } = require('../database/db');
const ItemAuction = require('../models/item_auctions');

exports.linkItemAuction = async (req, res) => {
  const { itemId, auctionId } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(`INSERT INTO item_auctions (itemId , auctionId) VALUES (:itemId, :auctionId)`,
      { itemId, auctionId }, { autoCommit: true });
    res.send('Item linked to auction');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error linking item to auction');
  }
};
