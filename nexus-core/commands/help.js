const { embed } = require("../utils/embed");
const { auth } = require("../middleware/auth");

module.exports = {
  name: "help",

  execute(message) {
    if (!auth("help")(message)) return;

    const e = embed("NEXUS CORE")
      .setDescription("Commands")
      .addFields(
        { name: ".report", value: "Full report" },
        { name: ".presence", value: "Server footprint" },
        { name: ".alert", value: "Spike detection" },
        { name: ".altcheck", value: "Alt scan" },
        { name: ".blacklist", value: "Blacklist user" }
      );

    message.reply({ embeds: [e] });
  }
};
