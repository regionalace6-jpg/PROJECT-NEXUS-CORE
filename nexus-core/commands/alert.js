const { checkSpike } = require("../services/alertService");
const { auth } = require("../middleware/auth");

module.exports = {
  name: "alert",

  async execute(message) {
    if (!auth("alert")(message)) return;

    const user = message.mentions.users.first() || message.author;

    const spike = await checkSpike(user.id);

    message.reply(spike ? "Spike detected." : "Normal activity.");
  }
};
