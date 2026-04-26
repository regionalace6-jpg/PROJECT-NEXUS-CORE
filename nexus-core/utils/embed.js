const { EmbedBuilder } = require("discord.js");

function embed(title) {
  return new EmbedBuilder()
    .setColor("#2b2d31")
    .setTitle(title)
    .setTimestamp();
}

module.exports = { embed };
