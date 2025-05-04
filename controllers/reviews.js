const { getConnection } = require('../database/db');
const Review = require('../models/reviews');

exports.addReview = async (req, res) => {
  const { userId, itemId, rating } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO reviews ( userId, itemId, rating,  reviewTimestamp)
       VALUES ( :userId, :itemId, :rating,  SYSTIMESTAMP)`,
      { userId, itemId, rating },
      { autoCommit: true }
    );
    res.send('Review added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add review');
  }
};

exports.getReviewsForItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM reviews WHERE itemId = :itemId`, [itemId]);
    const reviews = result.rows.map(row => new Review(row));
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve reviews');
  }
};
