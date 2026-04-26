const { altCheck } = require("../services/altEngine");
const { auth } = require("../middleware/auth");

module.exports = {
  name: "altcheck",

  async execute(message) {
    if (!auth("altcheck")(message)) return;

    const user = message.mentions.users.first() || message.author;
    const suspects = await altCheck(user.id);

    if (!suspects.length) return message.reply("No alt patterns.");

    message.reply(`Possible alts:\n${suspects.join("\n")}`);
  }
};
