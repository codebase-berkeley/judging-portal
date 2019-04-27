console.log("db index.js");

const { Pool } = require('pg');

require('dotenv').config();

const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString: connectionString,
})

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};