const { altCheck } = require("../services/altEngine");

module.exports = {
  name: "altcheck",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;
    const suspects = await altCheck(user.id);

    if (!suspects.length) return message.reply("No alt patterns.");

    message.reply(`Possible alts:\n${suspects.join("\n")}`);
  }
};
