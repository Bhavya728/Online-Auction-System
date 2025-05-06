const { getConnection } = require('../database/db');
const Category = require('../models/categories');

exports.createCategory = async (req, res) => {
  const {  parentCategoryId, name, description,  isActive } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO categories ( parentCategoryId, name, description,  isActive)
       VALUES ( :parentCategoryId, :name, :description,  :isActive)`,
      {  parentCategoryId, name, description,  isActive },
      { autoCommit: true }
    );
    res.send('Category created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create category');
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM categories`);
    
    console.log("Raw DB Result:", result); // 👈 Add this log

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).send("No categories found");
    }

    const categories = result.rows.map(row => new Category(row));
    res.json(categories);
  } catch (err) {
    console.error("Error in getAllCategories:", err);
    res.status(500).send('Error retrieving categories');
  }
};

