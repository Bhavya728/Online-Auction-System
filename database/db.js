const oracledb = require('oracledb');

const dbConfig = {
  user: 'SYSTEM',
  password: 'gautam1234',
  connectString: 'localhost:1521/XE' // Replace with your Oracle Live SQL connect string
};

async function getConnection() {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error("Error connecting to DB:", err);
    throw err;
  }
}

module.exports = { getConnection };
