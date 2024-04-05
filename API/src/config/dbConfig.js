const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "..", "..", ".env");

dotenv.config({ path: envPath });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// console.log(pool);
module.exports = pool;
