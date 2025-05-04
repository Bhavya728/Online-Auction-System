const { getConnection } = require('../database/db');
const Payment = require('../models/payments');

exports.makePayment = async (req, res) => {
  const { userId, amount, transactionReference,  refundEligible } = req.body;
  try {
    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO payments ( userId, amount, paymentTimestamp, transactionReference,  refundEligible)
       VALUES ( :userId, :amount, SYSTIMESTAMP, :transactionReference,  :refundEligible)`,
      { userId, amount, transactionReference,  refundEligible },
      { autoCommit: true }
    );
    res.send('Payment processed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment failed');
  }
};

exports.getPaymentsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM payments WHERE userId = :userId`,
      [userId]
    );
    const payments = result.rows.map(row => new Payment(row));
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving payments');
  }
};
