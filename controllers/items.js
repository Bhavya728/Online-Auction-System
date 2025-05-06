const { getConnection } = require('../database/db');
const Item = require('../models/items');
exports.createItem = async (req, res) => {
  const { name, description, categoryId, sellerId, basePrice, reservePrice } = req.body;
  try {
    const conn = await getConnection();

    // Check if sellerId exists in users table
    const result = await conn.execute(
      `SELECT id FROM users WHERE id = :sellerId`,
      [sellerId]
    );

    if (result.rows.length === 0) {
      return res.status(400).send('Seller does not exist');
    }

    // Proceed with item insertion if seller exists
    await conn.execute(
      `INSERT INTO items ( name, description, categoryId, sellerId, basePrice, listingTimestamp, reservePrice)
       VALUES (:name, :description, :categoryId, :sellerId, :basePrice, SYSTIMESTAMP, :reservePrice)`,
      {  name, description, categoryId, sellerId, basePrice, reservePrice },
      { autoCommit: true }
    );
    res.send('Item created');
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).send('Failed to create item');
  }
};



exports.getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM items WHERE id = :id`, [id]);
    const item = new Item(result.rows[0]);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Item fetch failed');
  }
};

exports.getItemByName = async (req, res) => {
  const { name } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM items WHERE name = :name`,
      [name]
    );
    const row = result.rows[0];
    if (!row) {
      return res.status(404).send('Item not found');
    }
    const item = { id: row[0], name: row[1], /* map rest if needed */ };
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error fetching item');
  }
};
