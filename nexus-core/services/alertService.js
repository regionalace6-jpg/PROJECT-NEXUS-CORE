const { pool } = require("./database");

async function checkSpike(userId) {

  const res = await pool.query(
    `SELECT count FROM activity WHERE user_id=$1 ORDER BY id DESC LIMIT 2`,
    [userId]
  );

  if (res.rows.length < 2) return false;

  return res.rows[0].count > res.rows[1].count * 2;
}

module.exports = { checkSpike };
