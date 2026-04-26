const { pool } = require("./database");

async function altCheck(userId) {

  const users = await pool.query(
    `SELECT user_id, COUNT(DISTINCT guild_id) as servers
     FROM activity GROUP BY user_id`
  );

  return users.rows
    .filter(u => u.user_id !== userId && u.servers > 3)
    .map(u => u.user_id)
    .slice(0, 5);
}

module.exports = { altCheck };
