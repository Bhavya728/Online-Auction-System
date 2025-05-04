const { getConnection } = require('../database/db');
const ItemImage = require('../models/item_images');

exports.addImage = async (req, res) => {
  const { itemId, imageUrl } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO item_images (itemId, imageUrl) VALUES (:itemId, :imageUrl)`,
      { itemId, imageUrl },
      { autoCommit: true }
    );
    res.send('Image added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Image upload failed');
  }
};

exports.getImages = async (req, res) => {
  const { itemId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM item_images WHERE itemId = :itemId`, [itemId]);
    const images = result.rows.map(row => new ItemImage(row));
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send('Image retrieval failed');
  }
};
