const { pool } = require("./database");

async function track(user, guildId) {
  const date = new Date().toISOString().split("T")[0];

  const res = await pool.query(
    `SELECT * FROM activity WHERE user_id=$1 AND date=$2 AND guild_id=$3`,
    [user.id, date, guildId]
  );

  if (res.rows.length > 0) {
    await pool.query(
      `UPDATE activity SET count = count + 1 WHERE user_id=$1 AND date=$2 AND guild_id=$3`,
      [user.id, date, guildId]
    );
  } else {
    await pool.query(
      `INSERT INTO activity(user_id, username, date, count, guild_id)
       VALUES($1,$2,$3,1,$4)`,
      [user.id, user.tag, date, guildId]
    );
  }
}

async function getGraph(userId) {
  const res = await pool.query(
    `SELECT date, SUM(count) as count
     FROM activity WHERE user_id=$1
     GROUP BY date ORDER BY date ASC`,
    [userId]
  );

  return res.rows;
}

module.exports = { track, getGraph };
