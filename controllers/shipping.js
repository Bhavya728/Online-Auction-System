const { getConnection } = require('../database/db');
const Shipping = require('../models/shipping');

exports.addShipping = async (req, res) => {
  const { transactionId, address, trackingNumber, deliveryTimestamp, cost, carrier, insurance } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO shipping (
         transactionId, address, trackingNumber, deliveryTimestamp, cost, carrier, insurance
       ) VALUES (
         :transactionId, :address, :trackingNumber, TO_TIMESTAMP(:deliveryTimestamp, 'YYYY-MM-DD"T"HH24:MI:SS'), :cost, :carrier, :insurance
       )`,
      {
        transactionId,
        address,
        trackingNumber,
        deliveryTimestamp, // Should be a string in ISO format, e.g., "2025-05-10T15:30:00"
        cost,
        carrier,
        insurance
      },
      { autoCommit: true }
    );
    
    res.send('Shipping info added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding shipping info');
  }
};