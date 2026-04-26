const { pool } = require("../services/database");

module.exports = {
  name: "blacklist",

  async execute(message, args) {

    const user = message.mentions.users.first();
    if (!user) return message.reply("Mention user.");

    const reason = args.slice(1).join(" ") || "No reason";

    await pool.query(
      `INSERT INTO blacklist(user_id, reason, level, reporter, date)
       VALUES($1,$2,$3,$4,$5)`,
      [user.id, reason, "HIGH", message.author.tag, new Date().toISOString()]
    );

    message.reply("User blacklisted.");
  }
};
