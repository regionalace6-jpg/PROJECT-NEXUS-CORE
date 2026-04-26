const express = require("express");
const router = express.Router();
const { pool } = require("../services/database");

router.get("/activity/:userId", async (req, res) => {
  const data = await pool.query(
    `SELECT date, SUM(count) as count
     FROM activity WHERE user_id=$1
     GROUP BY date ORDER BY date ASC`,
    [req.params.userId]
  );
  res.json(data.rows);
});

router.get("/blacklist", async (req, res) => {
  const data = await pool.query(`SELECT * FROM blacklist ORDER BY id DESC`);
  res.json(data.rows);
});

module.exports = router;
