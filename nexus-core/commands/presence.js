const { getUserStats } = require("../services/intelEngine");
const { auth } = require("../middleware/auth");

module.exports = {
  name: "presence",

  async execute(message) {
    if (!auth("presence")(message)) return;

    const user = message.mentions.users.first() || message.author;
    const stats = await getUserStats(user.id);

    message.reply(`Seen in ${stats.servers} servers.`);
  }
};
