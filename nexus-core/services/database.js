const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activity (
      id SERIAL PRIMARY KEY,
      user_id TEXT,
      username TEXT,
      date TEXT,
      count INT DEFAULT 1,
      guild_id TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blacklist (
      id SERIAL PRIMARY KEY,
      user_id TEXT,
      reason TEXT,
      level TEXT,
      reporter TEXT,
      date TEXT
    )
  `);
}

module.exports = { pool, initDB };
