const { getUserStats } = require("../services/intelEngine");

module.exports = {
  name: "presence",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;
    const stats = await getUserStats(user.id);

    message.reply(`Seen in ${stats.servers} servers.`);
  }
};
