console.log("db index.js");

const { Pool } = require('pg');

require('dotenv').config();

const connectionString = 'postgres://jmyweiavbyjzvf:d652c97c384bedf796b69f40891f6fb42f558455b72c8b11dbe0c8aa2700d07e@ec2-23-23-195-205.compute-1.amazonaws.com:5432/dad3s1n6f3mkt9'
const pool = new Pool({
  connectionString: connectionString,
})

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};