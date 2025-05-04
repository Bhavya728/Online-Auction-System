const { getConnection } = require('../database/db');
const ItemSpecification = require('../models/item_specifications');

exports.addSpecification = async (req, res) => {
  const { itemId, specKey, specValue } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO item_specifications (itemId, specKey, specValue)
       VALUES (:itemId, :specKey, :specValue)`,
      { itemId, specKey, specValue },
      { autoCommit: true }
    );
    res.send('Specification added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add specification');
  }
};

exports.getSpecifications = async (req, res) => {
  const { itemId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM item_specifications WHERE itemId = :itemId`,
      [itemId]
    );
    const specs = result.rows.map(row => new ItemSpecification(row));
    res.json(specs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch specifications');
  }
};
