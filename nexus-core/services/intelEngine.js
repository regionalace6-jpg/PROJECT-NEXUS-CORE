const { pool } = require("./database");

async function getUserStats(userId) {

  const activity = await pool.query(
    `SELECT date, SUM(count) as count
     FROM activity
     WHERE user_id=$1
     GROUP BY date ORDER BY date ASC`,
    [userId]
  );

  const servers = await pool.query(
    `SELECT COUNT(DISTINCT guild_id) as total
     FROM activity WHERE user_id=$1`,
    [userId]
  );

  return {
    activity: activity.rows,
    servers: parseInt(servers.rows[0].total)
  };
}

function calculateRisk(total, days, servers) {
  let score = 0;

  if (total > 200) score += 3;
  else if (total > 50) score += 2;
  else score += 1;

  if (days > 10) score += 2;
  else score += 1;

  if (servers > 3) score += 3;
  else if (servers > 1) score += 2;

  if (score >= 6) return "HIGH";
  if (score >= 4) return "MEDIUM";
  return "LOW";
}

module.exports = { getUserStats, calculateRisk };
