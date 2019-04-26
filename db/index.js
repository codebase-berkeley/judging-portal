console.log("db index.js");

const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool();

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};