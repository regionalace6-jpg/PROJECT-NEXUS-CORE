const { embed } = require("../utils/embed");

module.exports = {
  name: "help",
  execute(message) {

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
