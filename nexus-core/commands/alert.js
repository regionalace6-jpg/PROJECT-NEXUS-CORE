const { checkSpike } = require("../services/alertService");

module.exports = {
  name: "alert",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;

    const spike = await checkSpike(user.id);

    message.reply(spike ? "Spike detected." : "Normal activity.");
  }
};
